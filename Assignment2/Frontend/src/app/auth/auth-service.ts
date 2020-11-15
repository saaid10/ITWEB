import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface User {
    username: string,
    password: string,
    confirmPassword?: string
}

interface AuthToken {
    token: string
}

export const signOut = () => {
    window.localStorage.removeItem("loc8r-token");
    window.location.reload();
}

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    apiBaseUrl = "/api/";
    redirectUrl: string = "";

    setToken = (token: string) => {
        window.localStorage['loc8r-token'] = token;
    }

    getToken = (): string => {
        if (window.localStorage['loc8r-token']) {
            return window.localStorage['loc8r-token'];
        } else {
            return '';
        }
    }


    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        }).set('Access-Control-Allow-Origin', '*')
    }


    signIn = (user: User) => {
        const url = `${this.apiBaseUrl}auth/login`;
        this.http.post<AuthToken>(url, user, this.httpOptions).subscribe(data => {
            this.setToken(data.token);
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

    register(user: User) {
        const url = `${this.apiBaseUrl}auth/registration`;
        this.http.post<AuthToken>(url, user, this.httpOptions).subscribe(data => {
            this.setToken(data.token);
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