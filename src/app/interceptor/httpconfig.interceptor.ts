import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpParams
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');
        if (token && !this.isHeaderNeeded(request.url)) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (!request.headers.has('Content-Type')) {
            // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json').append('Content-Type', 'application/x-www-form-urlencoded').append('Content-Type', 'text/plain') });
           // request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data') });
            
        }

    // request = request.clone({ headers: request.headers.set('Accept', 'application/json').append('Content-Type', 'application/x-www-form-urlencoded').append('Content-Type', 'text/plain') });
     
          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('error--->>>', error.error);
                return throwError(error);
            }))
            //);
    }

    isHeaderNeeded(url: string) {
        return url.includes('/admin/forgot-password/')
    }
}