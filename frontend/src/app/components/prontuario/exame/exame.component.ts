import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AtestadoService } from '../../../services/atestado.service';
import { SoapService } from '../../../services/soap.service';

@Component({
  selector: 'app-exame',
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './exame.component.html',
  styleUrl: './exame.component.css'
})
export class ExameComponent {

  ngOnInit(): void {
    this.idConsulta = this._soapService.getIdConsulta();; // Ou pegue dinamicamente de outra forma

  }

  private readonly _soapService = inject(SoapService);
  private readonly _atestadoService = inject(AtestadoService);

  idConsulta: number|undefined; // Ou pegue dinamicamente de outra forma
  exame = '';
  cid = '';
  justificativa = '';
  observacoes = '';

  gerarPDF() {
    const doc = new jsPDF();
  
    const texto = `
      Exame/Encaminhamento: ${this.exame}
  
      CID 10: ${this.cid}
  
      Justificativa do procedimento/Encaminhamento:
      ${this.justificativa}
  
      Observações:
      ${this.observacoes}
    `;
  
    doc.setFontSize(12);
    doc.text(texto, 10, 20);
  
    // ✅ Agora o conteúdo está incluso no PDF
    const pdfBase64 = doc.output('datauristring');
  
    const exame = {
      id_consulta: this.idConsulta,
      pdf: pdfBase64
    };
  
    console.log("id_consulta:", this.idConsulta);
    console.log("pdf:", pdfBase64);
  
    this._atestadoService.salvarExame(exame).subscribe({
      next: () => console.log('Atestado enviado com sucesso!'),
      error: err => console.error('Erro ao enviar atestado:', err)
    });
  
    doc.save('exame-encaminhamento.pdf');
  }
}
