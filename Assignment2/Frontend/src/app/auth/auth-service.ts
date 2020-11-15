import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface User {
    username: string,
    password: string,
    confirmPassword?: string
}



@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    apiBaseUrl = "http://localhost:3000/api/";
    redirectUrl: string = "";



    getToken = () => {
        if (window.localStorage['loc8r-token']) {
            return window.localStorage['loc8r-token'];
        } else {
            return '';
        }
    }


    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        }).set('Authorization', 'Bearer ' +
            this.getToken()),
    }


    SignIn = (user: User) => {
        const url = `${this.apiBaseUrl}auth/login`;
        this.http.post<string>(url, user, this.httpOptions).subscribe(data => {
            this.saveToken(data);
            return true;
        },
            // Errors will call this callback instead:
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return false;
            });
    }

    public register(user: User) {
        const url = `${this.apiBaseUrl}auth/registration`;
        this.http.post<string>(url, user, this.httpOptions).subscribe(data => {
            this.saveToken(data);
            return true;
        },
            // Errors will call this callback instead:
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return false;
            });
    }

    SignOut = () => {
        window.localStorage.removeItem("loc8r-token")
    }

    saveToken = (token: string) => {
        window.localStorage['loc8r-token'] = token;
    }


    isLoggedIn = () => {
        const token = this.getToken();
        if (token) {
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }
}