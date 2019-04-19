import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import credentials from '../../assets/firebase-credentials';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private authService: AuthService) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const rCopy = req.clone(
         {
            params: req.params.set('auth', this.authService.getToken()),
            url: credentials.databaseURL + req.url
         }
      );
      return next.handle(rCopy);
   }
}
