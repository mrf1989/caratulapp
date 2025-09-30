import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "fs";

export async function modifyPdf(str) {
  const templatePath = "./assets/dossier.pdf";
  const existingPdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  const page = pages[0];
  const { width, height } = page.getSize();
  const textWith = helveticaBoldFont.widthOfTextAtSize(str.toUpperCase(), 22);

  page.drawText(`${str.toUpperCase()}`, {
    x: (width / 2) - (textWith / 2),
    y: (height / 2) + 80,
    size: 22,
    font: helveticaBoldFont,
  });

  const outDir = "./out";

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  fs.writeFileSync(`${outDir}/${str}.pdf`, await pdfDoc.save());
}