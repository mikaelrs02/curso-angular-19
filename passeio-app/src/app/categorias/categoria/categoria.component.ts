import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  camposForm: FormGroup;

  constructor() {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }
  salvar(){
    console.log(this.camposForm.value);
    console.log(this.camposForm.valid);
  }
  isCampoInvalido(campo: string): boolean {
    const campoControl = this.camposForm.get(campo);
    return campoControl ? campoControl.invalid && campoControl.touched && campoControl.errors?.['required'] : false;
  }
}
