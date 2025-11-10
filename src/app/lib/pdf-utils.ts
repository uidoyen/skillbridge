// lib/text-utils.ts
export function cleanExtractedText(text: string): string {
  if (!text) return "";

  return (
    text
      // Remove excessive whitespace
      .replace(/\s+/g, " ")
      // Clean up multiple newlines
      .replace(/\n+/g, "\n")
      // Remove page numbers and headers/footers (basic pattern)
      .replace(/\bPage\s+\d+\s+of\s+\d+\b/gi, "")
      .replace(/\b\d+\s*\/\s*\d+\b/g, "")
      .trim()
  );
}

export function validateJobDescription(text: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!text || text.trim().length === 0) {
    errors.push("Text is empty");
  }

  if (text.length < 50) {
    errors.push(
      "Text is too short to be a valid job description (minimum 50 characters)"
    );
  }

  if (text.length > 50000) {
    errors.push("Text is too long (maximum 50,000 characters)");
  }

  // Check for common job description indicators
  const jobKeywords = [
    "experience",
    "skills",
    "required",
    "qualifications",
    "responsibilities",
    "developer",
    "engineer",
    "role",
    "position",
    "job",
    "description",
  ];

  const hasJobKeywords = jobKeywords.some((keyword) =>
    text.toLowerCase().includes(keyword)
  );

  if (!hasJobKeywords && text.length > 100) {
    errors.push("Text does not appear to be a job description");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getTextStats(text: string) {
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const lines = text.split("\n").filter((line) => line.trim().length > 0);

  return {
    characters: text.length,
    words: words.length,
    lines: lines.length,
    sentences: text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length,
  };
}
