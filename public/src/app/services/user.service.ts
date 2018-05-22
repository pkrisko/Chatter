import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class UserService {
  private token : string;

  constructor(
    private _http: HttpClient, 
    private router: Router
  ) { }

  // Attempt to register a new user
  // public register(user, cb) : void {
  //   this._http.post("/register", user) 
  //   .subscribe((data)=>{
  //     if ('errors' in data || 'message' in data) {
  //       cb(data);
  //     } else {
  //       // if (data.token)
  //       //   this.saveToken(data.token);
  //       cb(data);
  //     }
  //   }); 
  // }

  // Attempt to login an existing user
  // public login(user, cb) : void { 
  //   this._http.post("/login", user) 
  //   .subscribe((data)=>{
  //     cb(data);
  //     // if ('errors' in data || 'message' in data) {
        
  //     // } else {
  //     //   // if (data.token)
  //     //   //   this.saveToken(data.token);
  //     //   cb(data);
  //     // }
  //   }); 
  // }  

  register(user, cb) {
    console.log(user);
    this._http.post("/register", { headers: { Authorization: `Bearer ${user}` }}) 
    .subscribe(data=>cb(data)); 
  }

  login(user, cb) { 
    this._http.post("/login", { headers: { Authorization: `Bearer ${user}` }}) 
    .subscribe(data=>cb(data)); 
  }  
  
  private saveToken(token: string) : void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken() : string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout() : void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

}

interface TokenResponse {
  token: string;
}
