import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { CategoriaService } from '../categoria.service';
@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  camposForm: FormGroup;

  constructor(private service: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }
  salvar(){
    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
      this.service.salvar(this.camposForm.value).subscribe({
        next: (categoria) => {
          alert('Categoria salva com sucesso');
          this.camposForm.reset();
        },
        error: (erro) => {
          alert('Erro ao salvar categoria: ' + erro.message);
        }
      });   
    } else {
      this.camposForm.markAllAsTouched();
    }
  }

  isCampoInvalido(campo: string): boolean {
    const campoControl = this.camposForm.get(campo);
    return campoControl ? campoControl.invalid && campoControl.touched && campoControl.errors?.['required'] : false;
  }
}
