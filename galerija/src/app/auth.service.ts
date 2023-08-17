import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface AuthResponseData { 
  kind: string; 
  idToken: string; //
  email: string; 
  refreshToken: string; 
  localId: string;  //
  expiresIn: string; 
  registered?: boolean; 
}

interface UserData{
  name?: string; 
  surname?: string; 
  email: string; //
  password: string;//
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _isUserAuthenticated = false; 
  constructor(private http: HttpClient) { }

  get isUserAuthenticated():boolean{
    return this._isUserAuthenticated;
  }

  logIn() {
    this._isUserAuthenticated = true;
  }

  logOut(){ 
    this._isUserAuthenticated = false;
  }

  register(user: UserData) { 
    this._isUserAuthenticated = true; 
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {
      email: user.email, 
      password: user.password, 
      returnSecureToken: true,
    });

  }
  
}
