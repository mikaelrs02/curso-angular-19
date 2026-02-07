import { Component } from '@angular/core';
import { Profile } from './profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landinpage',
  standalone: false,
  templateUrl: './landinpage.component.html',
  styleUrl: './landinpage.component.scss'
})
export class LandinpageComponent {


  profile: Profile | undefined;

  constructor(private router: Router) { 
    
  }
  navegar(){
    this.router.navigate(['/paginas/galeria']);
  }

  logarcomGoogle(){

  }

  isLoggedIn(){

    return !!this.profile;
    
  }
}
