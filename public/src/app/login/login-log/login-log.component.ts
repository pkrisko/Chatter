import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.css']
})
export class LoginLogComponent implements OnInit {

  private user =  {
    email: "",
    password: "",
  };
  private errors : Array<String>;
  private credentials: TokenPayload = {
    email: '',
    password: ''
  };


  constructor(
    private _userService : UserService,
    private _authService : AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.errors = new Array<String>();
  }

  login() {
    this.credentials.email = this.user.email;
    this.credentials.password = this.user.password;

    // Pass form data to userService, to attempt login.
    this._authService.login(this.credentials).subscribe(() => {
      console.log(this.credentials);
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    });
    // this._userService.login(this.user, (status=>{
    //   if (status.errors) {
    //     console.log("ERRORS");
    //     // If there are errors, add to errors array to view on page.
    //     for (var error in status.errors) {
    //       this.errors.push(status.errors[error].message);
    //     }
    //     console.log(this.errors);
    //   } else { // success
    //     console.log(status);
    //   }
    // }));
  }

}
