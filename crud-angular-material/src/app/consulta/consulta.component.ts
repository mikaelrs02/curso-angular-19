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
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliete';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['nome', 'cpf', 'dataNascimento', 'email', 'acoes'];
  deletando: string | null = null;

  constructor(
    private service: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar   // ✅ INJETADO
  ) {}

  ngOnInit(): void {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(): void {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string): void {
    this.router.navigate(['/cadastro'], { queryParams: { id } });
  }

  preparaDeletar(id: string): void {
    this.deletando = id;
  }

  deletar(cliente: Cliente): void {
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
    this.deletando = null;

    // ✅ SNACKBAR DE SUCESSO
    this.mostrarSucesso('Cliente removido com sucesso!');
  }

  cancelarDeletar(): void {
    this.deletando = null;
  }

  private mostrarSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
