import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Cliente } from './cliete';
import { ClienteService } from '../cliente.service';
import { BrasilapiService } from '../brasilapi.service';
import { Estado } from '../brasilapi.models';
import { Municipio } from '../brasilapi.models';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NgxMaskDirective,
    MatSnackBarModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando = false;
  estados: Estado[] = []; 
  municipios: Municipio[] = []; 
  constructor(
    private clienteService: ClienteService,
    private brasilapiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const clienteEncontrado =
          this.clienteService.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
      }
    })
    this.carregarUFs();
  }

  private mostrarSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  carregarUFs(){
    this.brasilapiService.listarUfs().subscribe({
      next: listaEstados => console.log("Lista de estados:", listaEstados),
      error: erro => console.log("ocorreu um erro:", erro)
    });
  }

  salvar(form: any): void {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    if (!this.atualizando) {
      this.clienteService.salvarCliente(this.cliente);
      this.mostrarSucesso('Cliente cadastrado com sucesso!');
      this.cliente = Cliente.newCliente();
      form.resetForm();
    } else {
      this.clienteService.atualizar(this.cliente);
      this.mostrarSucesso('Cliente atualizado com sucesso!');
      this.router.navigate(['/consulta']);
    }
  }
}
