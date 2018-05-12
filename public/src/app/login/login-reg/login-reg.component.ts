import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  user : User;
  passwords : Object;

  constructor() { }

  ngOnInit() {
    this.user = new User;
    this.passwords = {
      pw : "",
      pwc : "",
    }
  }

}
