import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

let localLLM: OpenAI | null = null;

if (process.env.LOCAL_LLM_BASE_URL) {
  localLLM = new OpenAI({
    apiKey: "not-needed", // local server usually doesn't need one
    baseURL: process.env.LOCAL_LLM_BASE_URL, // e.g. http://172.22.130.94:1234/v1
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!localLLM) {
      return NextResponse.json(
        { error: "Local LLM not configured. Add LOCAL_LLM_BASE_URL in .env" },
        { status: 500 }
      );
    }

    const { jdText, mode } = await req.json();

    if (!jdText || typeof jdText !== "string") {
      return NextResponse.json(
        { error: "Job description text is required" },
        { status: 400 }
      );
    }

    if (!mode || (mode !== "hr" && mode !== "dev")) {
      return NextResponse.json(
        { error: "Mode must be either 'hr' or 'dev'" },
        { status: 400 }
      );
    }

    const result = await generateWithLocalLLM(jdText, mode);
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Local Gemma API error:", error);
    return NextResponse.json(
      {
        error: (error as Error).message ?? "Failed to process with local Gemma",
      },
      { status: 500 }
    );
  }
}

function extractStructuredJson(content: string) {
  // Strip ```json or ``` fences and trim
  let cleaned = content.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // Extract first JSON object via regex
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON object found in response");
  }

  const jsonString = jsonMatch[0];

  // Parse JSON safely
  try {
    return JSON.parse(jsonString);
  } catch {
    throw new Error("Failed to parse extracted JSON");
  }
}

async function generateWithLocalLLM(jdText: string, mode: "hr" | "dev") {
  if (!localLLM) throw new Error("Local LLM client not initialized");

  const systemPromptHR = `You are an expert HR recruiter. Analyze the provided job description and return a JSON object in this exact structure:

{
  "skills": string[],
  "codingTask": {
    "title": string,
    "description": string,
    "difficulty": "beginner|intermediate|advanced",
    "requirements": string[]
  },
  "questions": {
    "technical": string[],
    "behavioral": string[]
  }
}

Guidelines:
- Do NOT include any markdown, code fences, or extra commentary.
- Always validate that JSON is well-formed and strictly matches this schema.
- If input is not a valid job description, return an error JSON: { "error": "Invalid job description" }`;

  const systemPromptDev = `You are a career coach for developers. Analyze the provided job description and return a JSON object in this exact structure:

{
  "skills": string[],
  "codingTask": {
    "title": string,
    "description": string,
    "difficulty": "beginner|intermediate|advanced",
    "requirements": string[],
    "learningResources": string[]
  },
  "questions": {
    "technical": string[],
    "behavioral": string[],
    "selfAssessment": string[]
  },
  "skillGaps": string[],
  "learningPath": string[]
}

Guidelines:
- Do NOT include any markdown, code fences, or extra commentary.
- Always validate that JSON is well-formed and strictly matches this schema.
- If input is not a valid job description, return an error JSON: { "error": "Invalid job description" }`;

  const userPrompt = `Analyze this job description text exactly as given:
"${jdText}"`;

  const systemPrompt = mode === "hr" ? systemPromptHR : systemPromptDev;

  const completion = await localLLM.chat.completions.create({
    model: "google/gemma-3n-e4b", // from your /v1/models response
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = completion.choices[0].message?.content;
  if (!content) throw new Error("Local Gemma returned empty response");

  console.log("Gemma raw response:", content);

  let parsed;
  try {
    parsed = extractStructuredJson(content);
  } catch (e: unknown) {
    console.warn(
      "Failed to extract structured JSON from Gemma response:",
      (e as Error).message
    );
    // fallback: return raw content as a string in a field
    return { rawResponse: content };
  }

  // Validate required fields
  const hasRequiredFieldsHR =
    parsed.skills && parsed.codingTask && parsed.questions;
  const hasRequiredFieldsDev =
    hasRequiredFieldsHR && parsed.skillGaps && parsed.learningPath;

  if (mode === "hr" && !hasRequiredFieldsHR) {
    throw new Error("Gemma response missing required fields for HR mode");
  }
  if (mode === "dev" && !hasRequiredFieldsDev) {
    throw new Error("Gemma response missing required fields for Dev mode");
  }

  return parsed;
}
