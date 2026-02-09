
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule, 
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})  
export class AppComponent {
  title = 'crud-angular-material';

  constructor(public auth: AuthService, private router: Router) {}

logout() {
  this.auth.logout();

  // limpa histórico e volta pro login
  this.router.navigateByUrl('/login', { replaceUrl: true });
}

}