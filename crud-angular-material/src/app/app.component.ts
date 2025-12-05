import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
=======
import {CalculadoraComponent} from './calculadora/calculadora.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';

@Component({
  selector: 'app-root',
  imports: [ListaComprasComponent],
>>>>>>> 869d70812ea7d7cd2a32bdf3f63605d88ec37d49
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
<<<<<<< HEAD
  title = 'crud-angular-material';
=======
  title = 'conceitos-basicos';
>>>>>>> 869d70812ea7d7cd2a32bdf3f63605d88ec37d49
}
