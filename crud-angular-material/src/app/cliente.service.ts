import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliete';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = '_CLIENTES';

  constructor() { }

  salvarCliente(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }
  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage();

    if(!nomeBusca){
      return clientes;
    }

    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1);
  }

  obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  buscarClientePorId(id: string): Cliente | undefined { 
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }
  atualizar(clienteAtualizado: Cliente){
    const storage = this.obterStorage();
    storage.forEach(cliente => {
      if(cliente.id === clienteAtualizado.id){
        Object.assign(cliente, clienteAtualizado);
    }
  })
  localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }
  deletar(cliente: Cliente) {
    const storage = this.obterStorage();

    const novaLista = storage.filter(c => c.id !== cliente.id);

    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(novaLista)
    );
  }
}