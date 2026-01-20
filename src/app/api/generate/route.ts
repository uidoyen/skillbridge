import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// JD validation criteria
const JD_KEYWORDS = [
  "experience",
  "skills",
  "qualifications",
  "requirements",
  "responsibilities",
  "developer",
  "engineer",
  "role",
  "position",
  "job",
  "hiring",
  "looking for",
  "must have",
  "should have",
  "we are seeking",
  "apply",
  "candidate",
  "role description",
  "job description",
  "career",
  "opportunity",
  "join our team",
  "about the role",
];

const MIN_JD_LENGTH = 50;
const MAX_JD_LENGTH = 10000;

export async function POST(request: NextRequest) {
  try {
    const { jdText, mode } = await request.json();

    // Validate input
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

    // Validate if it's actually a job description
    const validation = validateJobDescription(jdText);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: "Please provide a valid job description",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Check if Gemini is configured
    if (!genAI) {
      return NextResponse.json(
        {
          error:
            "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    console.log("Using Gemini for analysis...");
    const result = await generateWithGemini(jdText, mode);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      {
        error:
          "Failed to generate analysis. Please try again with a different job description.",
      },
      { status: 500 }
    );
  }
}

// Validate if the text is actually a job description
function validateJobDescription(text: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const cleanText = text.toLowerCase().trim();

  // Length validation
  if (cleanText.length < MIN_JD_LENGTH) {
    errors.push(
      `Text is too short (${cleanText.length} characters). Minimum ${MIN_JD_LENGTH} characters required.`
    );
  }

  if (cleanText.length > MAX_JD_LENGTH) {
    errors.push(
      `Text is too long (${cleanText.length} characters). Maximum ${MAX_JD_LENGTH} characters allowed.`
    );
  }

  // Keyword validation - check for JD-specific terminology
  const hasJdKeywords = JD_KEYWORDS.some((keyword) =>
    cleanText.includes(keyword.toLowerCase())
  );

  if (!hasJdKeywords && cleanText.length > 100) {
    errors.push(
      "Text doesn't appear to be a job description. Missing common job description terminology."
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

async function generateWithGemini(jdText: string, mode: "hr" | "dev") {
  if (!genAI) {
    throw new Error("Gemini client not initialized");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.1,
    },
  });

  const hrPrompt = `
    You are an expert HR recruiter. Analyze the following job description for hiring purposes.
    
    JOB DESCRIPTION:
    ${jdText}
    
    Return ONLY valid JSON with this exact structure:
    {
      "jdIntelligence": {
        "clarityScore": number (0-100),
        "roleSeniority": "Junior|Mid|Senior|Lead|Unknown",
        "marketAlignment": "Underpaid|Market-fit|Overpaid|Unknown",
        "issues": ["issue1", "issue2", ...],
        "skillClassification": {
          "primary": ["skill1", "skill2", ...],
          "secondary": ["skill1", "skill2", ...]
        }
      },
      "skills": [
        {
          "name": "Skill Name",
          "category": "Core|Supporting|Tools",
          "importance": "Must-have|Nice-to-have",
          "proficiency": "Beginner|Intermediate|Advanced",
          "rarity": "Common|Rare|Very Rare"
        }
      ],
      "salaryAnalysis": {
        "min": number,
        "max": number,
        "median": number,
        "currency": "string (e.g. USD, INR)",
        "locationAdjustment": "India|Remote|Global",
        "demandTrend": "Rising|Stable|Falling",
        "vacancyCost": number (estimated monthly cost of empty position)
      },
      "softSkillsAnalysis": {
        "communication": ["skill1", "skill2"],
        "ownership": ["skill1", "skill2"],
        "collaboration": ["skill1", "skill2"],
        "adaptability": ["skill1", "skill2"],
        "leadership": ["skill1", "skill2"],
        "redFlags": ["flag1", "flag2"]
      },
      "evaluationCriteria": [
        { "category": "Technical Skills", "weight": 50, "items": ["criteria1", "criteria2"] },
        { "category": "Problem Solving", "weight": 20, "items": ["criteria1", "criteria2"] },
        { "category": "Communication", "weight": 15, "items": ["criteria1", "criteria2"] },
        { "category": "Culture Fit", "weight": 10, "items": ["criteria1", "criteria2"] },
        { "category": "Growth Potential", "weight": 5, "items": ["criteria1", "criteria2"] }
      ],
      "codingTask": {
        "title": "Task title",
        "description": "High-level summary",
        "context": "Real-world scenario description (business context)",
        "difficulty": "beginner|intermediate|advanced",
        "duration": "e.g. 3-4 hours",
        "requirements": ["req1", "req2"],
        "techConstraints": ["constraint1", "constraint2"],
        "performanceExpectations": ["perf1", "perf2"],
        "edgeCases": ["case1", "case2"],
        "allowedResources": ["resource1", "resource2"],
        "rubric": {
          "correctness": 40,
          "quality": 25,
          "architecture": 20,
          "documentation": 10,
          "tests": 5
        }
      },
      "questions": {
        "technical": [
          { "question": "Question text", "category": "Fundamentals|Applied|System|Debugging", "followUp": "Scaling/Depth question" }
        ],
        "behavioral": [
           { "question": "Scenario question", "trait": "Accountability|Collaboration|Ownership", "context": "Brief context" }
        ]
      }
    }
    
    Focus on assessment and hiring perspective. Extract technical skills and create relevant coding challenges and interview questions.
    
    IMPORTANT: Return ONLY valid JSON. No additional text, no markdown, no code blocks.
  `;

  const devPrompt = `
    You are a career coach for developers. Analyze the following job description for skill development.
    
    JOB DESCRIPTION:
    ${jdText}
    
    Return ONLY valid JSON with this exact structure:
    {
      "jdIntelligence": {
        "clarityScore": number (0-100),
        "roleSeniority": "Junior|Mid|Senior|Lead|Unknown",
        "marketAlignment": "Underpaid|Market-fit|Overpaid|Unknown",
        "issues": ["issue1", "issue2", ...],
        "skillClassification": {
          "primary": ["skill1", "skill2", ...],
          "secondary": ["skill1", "skill2", ...]
        }
      },
      "skills": [
         {
          "name": "Skill Name",
          "category": "Core|Supporting|Tools",
          "importance": "Must-have|Nice-to-have",
          "proficiency": "Beginner|Intermediate|Advanced",
          "rarity": "Common|Rare|Very Rare"
        }
      ],
      "salaryEstimation": "string (e.g. $100k - $130k)",
      "softSkills": ["softSkill1", "softSkill2", ...],
      "resumeKeywords": ["keyword1", "keyword2", ...] (ATS keywords),
      "projectSuggestion": "string (brief description of a portfolio project)",
      "codingTask": {
        "title": "Practice project title",
        "description": "High-level summary",
        "context": "Real-world scenario description",
        "difficulty": "beginner|intermediate|advanced",
        "duration": "e.g. 3-4 hours",
        "requirements": ["req1", "req2"],
        "techConstraints": ["constraint1", "constraint2"],
        "performanceExpectations": ["perf1", "perf2"],
        "edgeCases": ["case1", "case2"],
        "allowedResources": ["resource1", "resource2"],
        "learningResources": ["resource1", "resource2"],
        "rubric": {
          "correctness": 40,
          "quality": 25,
          "architecture": 20,
          "documentation": 10,
          "tests": 5
        }
      },
      "questions": {
        "technical": [
          { "question": "Question text", "category": "Fundamentals|Applied|System|Debugging", "followUp": "Scaling/Depth question" }
        ],
        "behavioral": [
           { "question": "Scenario question", "trait": "Accountability|Collaboration|Ownership", "context": "Brief context" }
        ],
        "selfAssessment": ["question1", "question2", ...]
      },
      "skillGaps": ["gap1", "gap2", ...],
      "learningPath": ["step1", "step2", ...]
    }
    
    Focus on skill development and interview preparation. Identify skill gaps and provide learning guidance.
    
    IMPORTANT: Return ONLY valid JSON. No additional text, no markdown, no code blocks.
  `;

  const prompt = mode === "hr" ? hrPrompt : devPrompt;

  try {
    console.log("Sending request to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini raw response:", text);

    // Extract JSON using a simpler approach
    const jsonText = extractJsonFromText(text);
    console.log("Extracted JSON:", jsonText);

    try {
      const parsedData = JSON.parse(jsonText);

      // Validate the response structure
      // Validate the response structure
      if (
        !parsedData.skills ||
        !parsedData.codingTask ||
        !parsedData.questions
      ) {
        throw new Error("Invalid response structure from Gemini");
      }

      // Check for JD Intelligence
      if (!parsedData.jdIntelligence) {
        console.warn("Gemini response missing jdIntelligence");
        // We could throw here, but for now let's allow it to fail gracefully in UI
        // or mock it if strictly needed. Let's try to enforce it via prompt first.
      }

      // Check for new fields (optional but good to warn if missing)
      // Check for new fields (optional but good to warn if missing)
      if (
        !parsedData.salaryAnalysis &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn("Gemini response missing salaryAnalysis");
      }

      return parsedData;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Problematic text:", jsonText);

      throw new Error(
        `Invalid JSON response from Gemini: ${
          parseError instanceof Error
            ? parseError.message
            : "Unknown parsing error"
        }`
      );
    }
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    throw new Error(
      `Gemini API failed: ${
        error instanceof Error ? (error as Error).message : "Unknown error"
      }`
    );
  }
}

// Simplified JSON extraction function
function extractJsonFromText(text: string): string {
  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  // Remove markdown code blocks
  const cleaned = text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  // Find the first { and last } to extract JSON
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in response");
  }

  let jsonText = cleaned.substring(firstBrace, lastBrace + 1);

  // Fix common JSON issues
  jsonText = jsonText
    // Remove trailing commas
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]")
    // Fix any backslash issues (but don't escape quotes that are part of the content)
    .replace(/\\([^"\\])/g, "$1")
    .trim();

  return jsonText;
}
