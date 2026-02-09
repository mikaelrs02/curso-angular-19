import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'token';

  login(usuario: string, senha: string): boolean {
    if (usuario === 'admin' && senha === 'admin') {
      localStorage.setItem(this.TOKEN_KEY, 'token-fake');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
