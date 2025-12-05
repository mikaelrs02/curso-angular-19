import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ItemLista } from './itemlista';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss']
})
export class ListaComprasComponent {

  item: string = '';
  lista: ItemLista[] = [];

  adicionarItem() {
    let novoItem = new ItemLista();

    novoItem.nome = this.item;
    novoItem.id = this.lista.length + 1;

    this.lista.push(novoItem);

    this.item = '';
    
  }
  riscarItem(item: ItemLista) {
    item.comprado = !item.comprado;
  }

  limparLista() {
    this.lista = [];
  }
}
