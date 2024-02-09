import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!request.url.includes('cep')) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.auth.getToken(),
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        // if was unauthorized return to login page;
        if (!this.auth.isAuthenticated() && error.status == 401) {
          sessionStorage.clear();
          this.router.navigateByUrl("/authentication/login");
          return throwError(error.message || error);
        }
        return throwError(error);
      })
    );
  }
}
