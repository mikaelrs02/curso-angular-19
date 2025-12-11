import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliete';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, MatCardModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatDividerModule, MatButtonModule,CommonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = '';
  listaClientes : Cliente [] = [];
  colunasTable: string[] = ['nome', 'cpf', 'dataNascimento','email', 'acoes'];

  constructor(private service: ClienteService, private router: Router)   { 

  } 

  ngOnInit(): void {
    this.listaClientes = this.service.pesquisarClientes('');
  } 

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }
  preparaEditar(id: string | undefined){
  this.router.navigate(['/cadastro'],{queryParams: {id : id}});
}

}
