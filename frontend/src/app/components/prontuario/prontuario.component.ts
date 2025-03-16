import { Component } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-prontuario',
  imports: [TollbarheaderComponent, MatDivider],
  templateUrl: './prontuario.component.html',
  styleUrl: './prontuario.component.css'
})
export class ProntuarioComponent {

}
