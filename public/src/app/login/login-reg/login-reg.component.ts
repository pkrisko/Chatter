import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  user : User;
  passwords : Object;

  constructor(
    _userService : UserService
  ) { }

  ngOnInit() {
    this.user = new User;
    this.passwords = {
      pw : "",
      pwc : "",
    }
  }

  register() {
    console.log(this.user);
    console.log(this.passwords);
  }

}
