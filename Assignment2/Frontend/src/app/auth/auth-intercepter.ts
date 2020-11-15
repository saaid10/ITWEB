import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './auth-service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        const token: string = this.auth.getToken();
        debugger
        if (token !== "") {
            const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + this.auth.getToken() } });

            // Pass on the cloned request instead of the original request.
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}
