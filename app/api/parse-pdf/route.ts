// app/api/parse-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      // Dynamic import with specific version to avoid compatibility issues
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;

      const data = await pdfParse(buffer);

      console.log("PDF Parse Results:", {
        textLength: data.text?.length,
        numPages: data.numpages,
        hasText: !!data.text?.trim(),
      });

      // Check if we got any text
      if (!data.text || data.text.trim().length === 0) {
        return NextResponse.json(
          {
            error:
              "This appears to be a scanned PDF or contains only images. No selectable text was found.",
            suggestion:
              "Please try a PDF with selectable text, or copy and paste the text content manually.",
          },
          { status: 400 }
        );
      }

      // Basic text cleaning
      const cleanedText = data.text
        .replace(/\s+/g, " ")
        .replace(/\n+/g, "\n")
        .replace(/[^\S\n]+/g, " ")
        .trim();

      // Validate minimum text length
      if (cleanedText.length < 50) {
        return NextResponse.json(
          {
            error:
              "Very little text found in PDF. This might be a scanned document.",
            text: cleanedText, // Return what we found anyway
            warning: true,
          },
          { status: 200 } // Still return 200 but with warning
        );
      }

      const words = cleanedText
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      const lines = cleanedText
        .split("\n")
        .filter((line) => line.trim().length > 0).length;

      return NextResponse.json({
        text: cleanedText,
        pages: data.numpages,
        characters: cleanedText.length,
        words: words,
        lines: lines,
        success: true,
      });
    } catch (parseError: any) {
      console.error("PDF parse error details:", {
        message: parseError.message,
        stack: parseError.stack,
      });

      // More specific error messages
      if (parseError.message?.includes("password")) {
        return NextResponse.json(
          {
            error:
              "PDF is password-protected. Please remove the password and try again.",
          },
          { status: 400 }
        );
      }

      if (parseError.message?.includes("corrupt")) {
        return NextResponse.json(
          { error: "PDF appears to be corrupted or invalid." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Unable to read this PDF. It might be scanned (image-based), password-protected, or use an unsupported format.",
          suggestion:
            "Try converting the PDF to text using: 1) Adobe Acrobat 'Export PDF' feature, 2) Google Drive (upload and open with Google Docs), or 3) Copy text manually and paste below.",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("PDF parsing API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process PDF file",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
