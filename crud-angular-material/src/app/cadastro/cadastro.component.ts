import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliete';
import { ClienteService } from '../cliente.service';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,MatDividerModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cliente: Cliente = Cliente.newCliente();

  constructor(private clienteService: ClienteService) {
    
  }  
  salvar(){
    this.clienteService.salvarCliente(this.cliente);
  }
}
