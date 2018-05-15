import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  // Hold all necessary fields to insert into NoSQL DB
  user : User;
  // Hold both passwords to check later if they match
  passwords : Object;
  errors : Array<String>;

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit() {
    this.user = new User;
    this.errors = new Array<String>();
    this.passwords = {
      pw : "",
      pwc : "",
    }
  }

  register() {
    this._userService.register({"user" : this.user, "passwords":this.passwords}, (status => {
      if (status.errors) {
        console.log("ERRORS");
        for (var error in status.errors) {
          this.errors.push(status.errors[error].message);
        }
        console.log(this.errors);
      } else if (status.message && status.message.includes("E11000")) {
        this.errors.push("A user with this email already exists!")
      } else {
        console.log("SUCCESS BOI");
        console.log(status);
        // this.user = new User();
      }
    }));
  }

}
// t
