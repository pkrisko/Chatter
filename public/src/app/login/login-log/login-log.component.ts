import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.css']
})
export class LoginLogComponent implements OnInit {

  private user : Object;
  private errors : Array<String>;

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit() {
    this.errors = new Array<String>();
    this.user = {
      email: "",
      password: "",
    };
  }

  login() {
    // Pass form data to userService, to attempt login.
    this._userService.login(this.user, (status=>{
      if (status.errors) {
        console.log("ERRORS");
        // If there are errors, add to errors array to view on page.
        for (var error in status.errors) {
          this.errors.push(status.errors[error].message);
        }
        console.log(this.errors);
      } else { // success
        console.log(status);
      }
    }));
  }

}
