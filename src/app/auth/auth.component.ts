import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;

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

    if(this.isLoginMode){
      //...
    }else{
      this.authService.signup(email, password).subscribe(resData => {
        console.log(`AuthService signup resData says what?`, resData)
      }, error => {
        console.log(`error at signup:`,error);
      });
    }

    form.reset();
  };
}