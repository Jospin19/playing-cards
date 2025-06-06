import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { map, Observable, of, tap, throwError } from 'rxjs'; // Ajoutez 'throwError' pour les erreurs simulées

export interface Credentials{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8000';

  user = signal<User | null | undefined>(undefined);

  constructor() { }

  login(credentials : Credentials): Observable<User | null | undefined> {
    /*
    return this.http.post<User>(this.BASE_URL + '/sessions/login', credentials, { withCredentials: true }).pipe(
      tap((result: any) => {
        localStorage.setItem('token', result['token']);
        const user = Object.assign(new User(), result['user']);
        this.user.set(user);
      }),
    map((result: any) => {
      return this.user();
    }));
    */

    // Bypass du login pour continuer le tuto
    if(credentials.username === 'test' && credentials.password === 'test') {
      const mockUser = new User();
      mockUser.username = 'test';
      mockUser.firstName='test';
      mockUser.lastName='test';
      this.user.set(mockUser);
      //localStorage.setItem('token', 'mock_token_for_test'); // Simulez le stockage du token
      return of(mockUser) as Observable<User | null | undefined>; // Retournez ici
    } else {
      // Simulez une erreur pour les mauvaises identifiants
      // Cela correspondrait au 'error' callback dans votre LoginComponent
      return throwError(() => new Error('Invalid Credentials (Bypass mode)'));
    }
  }


  getUsers(): Observable<User | null | undefined> {
    // Note: Dans un vrai scénario, cette méthode nécessiterait un token pour l'authentification
    return this.http.get(this.BASE_URL + '/sessions/me').pipe(
      tap((result: any) => {
        const user = Object.assign(new User(), result);
        this.user.set(user);
      }),
      map((result: any) => { return this.user(); })
    )
  }

  logout() : Observable<null> {
    return this.http.get(this.BASE_URL + '/sessions/logout/').pipe(
      tap((result: any) => {
        localStorage.removeItem('token');
        this.user.set(null);
      })
    )
  }

}