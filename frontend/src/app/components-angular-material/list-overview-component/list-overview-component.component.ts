import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { IAgendamento } from '../../interfaces/agendamento.interface';
import { CustomDatePipe } from "../../pipes/date.type";
import { HorarioPipe } from "../../pipes/horario.pipe"; // ✅ Importando o CommonModule
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../services/pfd.service'; // Importando o serviço de PDF
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-list-overview-component',
  imports: [MatListModule, CustomDatePipe, HorarioPipe, MatDivider, MatButton, CommonModule],
  templateUrl: './list-overview-component.component.html',
  styleUrls: ['./list-overview-component.component.css']
})
export class ListOverviewComponentComponent {

  @Input({ required: true }) agendamento: IAgendamento = {} as IAgendamento;
  @Input() showAgendamentoDetails: boolean = false;

  private readonly _authService = inject(AuthService);
  user_type = this._authService.getUserScopes();

  @Input() pdfs: {
    atestadoBase64: string;
    prescricaoBase64: string;
    exameEncaminhamentoBase64: string;
  } = {
    atestadoBase64: '',
    prescricaoBase64: '',
    exameEncaminhamentoBase64: ''
  };

  documentosGerados(): boolean {
    return !!(
      this.pdfs.atestadoBase64 ||
      this.pdfs.prescricaoBase64 ||
      this.pdfs.exameEncaminhamentoBase64
    );
  }

  @Output('onDesmarcar') desmarcarConsultaEmmitter = new EventEmitter<IAgendamento>();
  @Output('onConfirmarPresenca') confirmarPresencaEmmitter = new EventEmitter<IAgendamento>();
  @Output('onIniciarConsulta') iniciarConsultaEmmitter = new EventEmitter<IAgendamento>();

  

  baixarPdfDeDataUri(dataUri: string, filename: string) {
    if (!dataUri) {
      console.error('DATA URI não fornecido');
      return;
    }
  
    // Extrair a parte base64 do DATA URI
    const base64Data = dataUri.split(',')[1]; // Parte após a vírgula, que é o base64
  
    if (!base64Data) {
      console.error('Base64 não encontrado no DATA URI');
      return;
    }
  
    // Limpar o base64 de caracteres inválidos (como quebras de linha e espaços extras)
    const cleanedBase64 = base64Data.replace(/[^A-Za-z0-9+/=]/g, '');
  
    try {
      // Converter o base64 em um array de bytes
      const byteCharacters = atob(cleanedBase64);
      const byteArrays = [];
  
      // Converter os caracteres em um array de bytes
      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
  
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
  
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
  
      // Criar um Blob a partir dos bytes
      const blob = new Blob(byteArrays, { type: 'application/pdf' });
  
      // Criar um link para o download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
  
      // Acionar o clique no link para baixar o arquivo
      link.click();
  
    } catch (error) {
      console.error('Erro ao decodificar base64:', error);
    }
  }

  // Funções de ações (métodos emitidos no componente)
  onConfirmarPresenca(agendamento: IAgendamento) {
    this.confirmarPresencaEmmitter.emit(agendamento);
  }

  onDesmarcarConsulta(agendamento: IAgendamento) {
    this.desmarcarConsultaEmmitter.emit(agendamento);
  }

  onIniciarConsulta(atendimento: IAgendamento) {
    this.iniciarConsultaEmmitter.emit(atendimento);
  }
}
