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
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from './cliete';
import { ClienteService } from '../cliente.service';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
    MatSnackBarModule,
    MatSelectModule,
    CommonModule,
    MatAutocompleteModule
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
  filteredEstados: Estado[] = [];  
  filteredMunicipios: Municipio[] = [];  
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
          if (this.cliente.uf) {
            this.carregarMunicipios(this.cliente.uf);
          }
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
      next: listaEstados => {
        console.log("Lista de estados:", listaEstados);
        this.estados = listaEstados;
        this.filteredEstados = listaEstados;
      },
      error: erro => console.log("ocorreu um erro:", erro)
    });
  }
  filtrarUF(texto: string): void {
    if (!texto) {
      this.filteredEstados = this.estados;
      return;
    }
    const filtro = texto.toLowerCase();
    this.filteredEstados = this.estados.filter(uf =>
      uf.nome.toLowerCase().includes(filtro) || uf.sigla.toLowerCase().includes(filtro)
    );
  }

  carregarMunicipios(uf: string): void {
    if (!uf) {
      this.filteredMunicipios = [];
      return;
    }
    this.brasilapiService.listarMunicipios(uf).subscribe({
      next: listaMunicipios => {
        this.municipios = listaMunicipios;
        this.filteredMunicipios = listaMunicipios;
      },
      error: erro => console.log("Erro ao carregar municípios:", erro)
    });
  }
  
  filtrarMunicipios(texto: string): void {
    if (!texto) {
      this.filteredMunicipios = this.municipios;
      return;
    }
    const filtro = texto.toLowerCase();
    this.filteredMunicipios = this.municipios.filter(municipio =>
      municipio.nome.toLowerCase().includes(filtro)
    );
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

  // MÉTODO ADICIONADO PARA LIMPAR FORMULÁRIO
  limparFormulario(form?: any): void {
    // Resetar o objeto cliente
    this.cliente = Cliente.newCliente();
    
    // Se um formulário foi passado, resetar ele também
    if (form) {
      form.resetForm();
    }
    
    // Resetar os filtros
    if (this.estados.length > 0) {
      this.filteredEstados = [...this.estados];
    }
    
    // Resetar municípios
    this.municipios = [];
    this.filteredMunicipios = [];
    
    // Resetar estado de atualização
    this.atualizando = false;
    
    // Navegar para a rota sem parâmetros
    this.router.navigate(['/cadastro']);
    
    // Mostrar feedback
    this.snackBar.open('Formulário limpo com sucesso!', 'OK', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}