import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router){}

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

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else{
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      console.log(`AuthService signup/login resData says what?`, resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, 
    errorMessage => {
      console.log(`error at signup/login:`, errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  };
}