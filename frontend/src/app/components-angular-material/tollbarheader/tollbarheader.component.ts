import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tollbarheader',
  imports: [MatToolbarModule, MatIconModule,    MatMenuModule,],
  templateUrl: './tollbarheader.component.html',
  styleUrl: './tollbarheader.component.css'
})
export class TollbarheaderComponent {

  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router);

user_type:string =  this._authService.getUserScopes();

navigateTo(page: string) {
  this._router.navigate([page]);
}

}
