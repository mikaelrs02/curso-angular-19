import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../../lugares/lugar.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss',
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltros: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro: string = '';



  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe(categorias => this.categoriasFiltros = categorias)
    this.lugarService.obterTodos().subscribe(lugaresResposta => this.lugares = lugaresResposta)
  }

  getEstrelas(qtd: number): number[] {
  return Array(5).fill(0).map((_, i) => i < qtd ? 1 : 0);
  }

  aplicarFiltros(): void {
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
      .subscribe(lugaresFiltrados => this.lugares = lugaresFiltrados);
  }


}
