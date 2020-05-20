import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  };

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    console.log(`values of the form?`,form.value);
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode){
      //...
    }else{
      this.authService.signup(email, password).subscribe(resData => {
        console.log(`AuthService signup resData says what?`, resData);
        this.isLoading = false;
      }, error => {
        console.log(`error at signup:`,error);
        this.error = 'An Error occurred!';
        this.isLoading = false;
      });
    }

    form.reset();
  };
}