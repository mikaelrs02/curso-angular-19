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
import { MatTooltipModule } from '@angular/material/tooltip';

import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliete'; // Note o nome do arquivo: "cliete"

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
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'ufMunicipio', 'acoes'];
  deletando: string | null = null;

  constructor(
    private service: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(): void {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  // Método para limpar a busca
  limparBusca(): void {
    this.nomeBusca = '';
    this.listaClientes = this.service.pesquisarClientes('');
    this.deletando = null;
  }

  // Método para formatar CPF
  formatarCPF(cpf: string): string {
    if (!cpf) return '';
    
    const cleaned = cpf.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
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

    // Snackbar de sucesso
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
      panelClass: ['success-snackbar']
    });
  }
  formatarUfMunicipio(cliente: any): string {
  if (cliente.uf && cliente.municipio) {
    return `${cliente.uf}-${cliente.municipio}`;
  } else if (cliente.uf) {
    return cliente.uf;
  } else if (cliente.municipio) {
    return cliente.municipio;
  } else {
    return 'Não informado';
  }
}

aplicarFiltroTempoReal(): void {
  this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
}

}