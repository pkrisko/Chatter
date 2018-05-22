import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthenticationService {
  private token : string;

  constructor(
    private _http: HttpClient, 
    private router: Router
  ) { }

  // Three main calls
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }
  
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  // Private method for reducing repetitive code making http calls
  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;
  
    if (method === 'post') {
      base = this._http.post(`/${type}`, user);
    } else {
      base = this._http.get(`/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    
    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log(data);
        if (data.token) {
          console.log(data.token);
          this.saveToken(data.token);
        }
        return data;
      })
    );
    console.log(request);
    return request;
  }

  private saveToken(token: string) : void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken() : string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    console.log(this.token);
    return this.token;
  }

  public logout() : void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails() : UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  // Returns a boolean whether or not a user is currently logged in
  public isLoggedIn() : boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

}

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}
