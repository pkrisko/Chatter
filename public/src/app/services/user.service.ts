import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient, private router: Router) { }

  // Attempt to register a new user
  register(user, cb) {
    this._http.post("/register", user) 
    .subscribe(data=>cb(data)); 
  }

  // Attempt to login an existing user
  login(user, cb) { 
    this._http.post("/login", user) 
    .subscribe(data=>cb(data)); 
  }  
  
  // Logout the current user from session
  logout() {
    localStorage.setItem("userId", undefined);
    this.router.navigate(["/"]);    
  } 

}
