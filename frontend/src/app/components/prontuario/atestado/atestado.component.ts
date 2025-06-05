import { Component, inject, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { SoapService } from '../../../services/soap.service';
import { AtestadoService } from '../../../services/atestado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-atestado',
  imports: [FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './atestado.component.html',
  styleUrls: ['./atestado.component.css']
})
export class AtestadoComponent implements OnInit{
  ngOnInit(): void {
    this.idConsulta = this._soapService.getIdConsulta();; // Ou pegue dinamicamente de outra forma

  }

  private readonly _soapService = inject(SoapService);
  private readonly _atestadoService = inject(AtestadoService);
  
  idConsulta: number|undefined; // Ou pegue dinamicamente de outra forma
  nome = '';
  cpf = '';
  data = '';
  hora = '';
  diasAtestado = '';



  gerarPDF() {
    const doc = new jsPDF();


    const textoAtestado = 
    `Atesto, para os devidos fins, que o(a) paciente ${this.nome}, portador(a) do CPF ${this.cpf}, ` +
    `foi atendido(a) em consulta médica nesta data, apresentando condição de saúde que exige ` +
    `afastamento de suas atividades por um período de ${this.diasAtestado} dia(s), a contar de ${this.data}.\n\n` +
    `Este atestado é fornecido para justificar sua ausência por motivos de saúde.`;

    doc.text(textoAtestado, 10, 80, { maxWidth: 180 });

    // 🔁 Converte PDF em Base64
    const pdfBase64 = doc.output('datauristring');

    // 🔃 Prepara objeto para envio
    const atestado = {
      id_consulta: this.idConsulta,
      pdf: pdfBase64
    }

    // 🔼 Envia para o backend
    console.log("id_consulta:", this.idConsulta);
    console.log("pdf:", pdfBase64);

    this._atestadoService.salvarAtestado(atestado).subscribe({
      next: () => console.log('Atestado enviado com sucesso!'),
      error: err => console.error('Erro ao enviar atestado:', err)
    });

    // (Opcional) Baixar PDF localmente também
    doc.save('atestado.pdf');
  }
}
