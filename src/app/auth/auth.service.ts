import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;                      //--> only for login, thus it is optional with ? sign
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient){}

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAciAldHViHThHcqsJ_wjQ6qLNMO06zQv4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(
      errorRes => {
        let errorMessage = 'An unknown error occured'                 //default error message

        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email has already been registered for a user!';
        }
        return throwError(errorMessage);
      }
    ));
  };
  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAciAldHViHThHcqsJ_wjQ6qLNMO06zQv4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }

}