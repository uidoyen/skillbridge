import pdfParse from "pdf-parse";

export async function parsePdf(buffer: Buffer) {
  return await pdfParse(buffer);
}
