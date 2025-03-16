import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horario'
})
export class HorarioPipe implements PipeTransform {
  transform(value: any): string { 
    if (!value || typeof value !== 'string') return ''; 
    // Verifica se o valor não é vazio e se realmente é uma string
    
    const regex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})/; 
    const match = value.match(regex); 

    if (match) {
      const hours = match[1]; 
      const minutes = match[2];
      return `${hours}:${minutes}`; 
    }

    return 'Hora inválida'; 
  }
}


