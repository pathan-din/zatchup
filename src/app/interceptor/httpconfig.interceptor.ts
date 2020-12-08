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

import { Observable, of, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }
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
            catchError((error) => {
                let handled: boolean = false;
                console.error(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    }
                    else {
                        console.log(`error status : ${error.status} ${error.statusText}`);
                        switch (error.status) {
                            case 401:      //login
                                this.navigateToLogin();
                                handled = true;
                                break;
                            case 403:     //forbidden
                                this.navigateToLogin();
                                handled = true;
                                break;
                        }
                    }
                } else {
                    console.error("Other Errors");
                }

                if (handled) {
                    return of(error);
                } else {
                    return throwError(error)
                }
            })
        )
    }

    navigateToLogin() {
        if (this.getParentComponentRoute(this.router.url) !== '')
            this.router.navigate([this.getParentComponentRoute(this.router.url) + '/login'])
    }

    getParentComponentRoute(url: string): string {
        const route = url.split('/')
        return route[1]
    }

    isHeaderNeeded(url: string) {
        return url.includes('/admin/forgot-password/')
    }
}