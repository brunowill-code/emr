import { Component } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { PerfilInputsComponent } from "../../components-angular-material/perfil-inputs/perfil-inputs.component";

@Component({
  selector: 'app-perfil',
  imports: [TollbarheaderComponent, MatDivider, PerfilInputsComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
