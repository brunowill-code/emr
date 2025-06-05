import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import jsPDF from 'jspdf';
import { AtestadoService } from '../../../services/atestado.service';
import { SoapService } from '../../../services/soap.service';


interface Prescricao {
  nome: string;
  dosagem: string;
  intervalo: number;
  dias:string;
}

@Component({
  selector: 'app-prescricao',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,FormsModule,FormsModule, MatFormField,MatLabel,CommonModule,MatButton],
  templateUrl: './prescricao.component.html',
  styleUrl: './prescricao.component.css'
})
export class PrescricaoComponent implements OnInit{

  ngOnInit(): void {
    this.idConsulta = this._soapService.getIdConsulta();; // Ou pegue dinamicamente de outra forma

  }

  private readonly _soapService = inject(SoapService);
  private readonly _atestadoService = inject(AtestadoService);

  idConsulta: number|undefined; // Ou pegue dinamicamente de outra forma

  prescricaoAtual: Prescricao = { nome: '', dosagem: '', intervalo: 0 ,dias:''};
  prescricoes: Prescricao[] = [];

  adicionarPrescricao() {
    if (this.prescricaoAtual.nome && this.prescricaoAtual.dosagem && this.prescricaoAtual.intervalo > 0) {
      this.prescricoes.push({ ...this.prescricaoAtual });
      this.prescricaoAtual = { nome: '', dosagem: '', intervalo: 0 , dias:''};
    }
  }

  gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Prescrições Médicas', 10, 10);
    doc.setFontSize(12);

    let y = 20;
    this.prescricoes.forEach((p, i) => {
      doc.text(`${i + 1}. Medicamento: ${p.nome}`, 10, y);
      doc.text(`   Dosagem: ${p.dosagem}`, 10, y + 7);
      doc.text(`   Intervalo: ${p.intervalo}h`, 10, y + 14);
      doc.text(`   Dias: ${p.dias}h`, 10, y + 21);

      y += 25;
    });

    // 🔁 Converte PDF em Base64
    const pdfBase64 = doc.output('datauristring');

    // 🔃 Prepara objeto para envio
    const prescricao = {
      id_consulta: this.idConsulta,
      pdf: pdfBase64
    }

    // 🔼 Envia para o backend
    console.log("id_consulta:", this.idConsulta);
    console.log("pdf:", pdfBase64);

    this._atestadoService.salvarPrescricao(prescricao).subscribe({
      next: () => console.log('Atestado enviado com sucesso!'),
      error: err => console.error('Erro ao enviar atestado:', err)
    });

    doc.save('prescricoes.pdf');
  }
}
