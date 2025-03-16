import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-perfil-inputs',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule],
  templateUrl: './perfil-inputs.component.html',
  styleUrl: './perfil-inputs.component.css'
})
export class PerfilInputsComponent {

}
