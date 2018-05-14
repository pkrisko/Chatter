import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient, private router: Router) { }

  register(user, cb) {
    this._http.post("/register", user) 
    .subscribe(data=>cb(data)); 
  }
  login(user, cb) { 
    this._http.post("/login", user) 
    .subscribe(data=>cb(data)); 
  }   
  logout() {
    localStorage.setItem("userId", undefined);
    this.router.navigate(["/"]);    
  } 

}
