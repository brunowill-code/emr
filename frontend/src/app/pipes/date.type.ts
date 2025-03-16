import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    let date: Date;

    if (typeof value === 'string') {
      date = new Date(value);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
    } else if (value instanceof Date) {
      date = value;
    } else {
      return 'Formato inválido';
    }

    const day = ('0' + date.getUTCDate()).slice(-2);
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
}

// Para usar esse pipe, adicione no módulo:
// providers: [CustomDatePipe]
// E no HTML: {{ agendamento.data_agendamento | customDate }}
