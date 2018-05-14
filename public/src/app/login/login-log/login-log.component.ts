import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.css']
})
export class LoginLogComponent implements OnInit {

  user = {
    email: "",
    password: "",
  };
  errors = new Array<Object>();

  constructor(
    _userService : UserService
  ) { }

  ngOnInit() {
    // this.user = new User();
    console.log(this.user);
  }

  login() {
    console.log(this.user);
  }

}
