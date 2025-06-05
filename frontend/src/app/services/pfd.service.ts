// pdf.service.ts
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class PdfService {

  constructor() { }

  async convertBase64ToPdf(base64Pdf: string): Promise<Uint8Array> {
    const pdfBytes = this.decodeBase64(base64Pdf);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Salva o PDF carregado e retorna os bytes
    const pdfOutputBytes = await pdfDoc.save();
    return pdfOutputBytes;
  }

  private decodeBase64(base64String: string): Uint8Array {
    const base64Data = base64String.replace(/^data:application\/pdf;base64,/, '');
    return new Uint8Array(atob(base64Data).split('').map(char => char.charCodeAt(0)));
  }
}
