import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria'; 
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService, private service: LugarService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacoes: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias: Categoria[]) => {
        this.categorias = listaCategorias;
      },
      error: (error) => {
        console.error('Erro ao obter categorias:', error);
      }
    });
  }

salvarLugar() {
  this.camposForm.markAllAsTouched();

  if (this.camposForm.valid) {
    this.service.salvar(this.camposForm.value).subscribe({
      next: (lugar) => {
        console.log('Lugar salvo com sucesso:', lugar);
        this.camposForm.reset();
      },
      error: (error) => {
        console.error('Erro ao salvar lugar:', error);
      }
    });
  }
}



  isCampoInvalido(campo: string): boolean {
    const campoControl = this.camposForm.get(campo);
    return campoControl ? campoControl.invalid && campoControl.touched && campoControl.errors?.['required'] : false;
  }

}
