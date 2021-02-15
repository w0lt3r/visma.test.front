import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(public router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                evt => {
                },
                (httpErrorResponse: HttpErrorResponse) => {
                    this.handleErrorResponse(httpErrorResponse);
                }
            )
        );
    }
    private handleErrorResponse(response: HttpErrorResponse) {
        if (response.status === 401) {
            Swal.fire({
                title: 'Información',
                text: 'Must login to see the content.',
                icon: 'error'
            }).finally(() => {
                this.router.navigate(['/login']);
            })

        } else if (response.status >= 400 && response.status < 500) {
            let htmlError = '';
            response.error.forEach(error => {
                htmlError = htmlError + '<li>' + error.Message + '</li>';
            });
            htmlError = '<ul style=\'text-align: left;\'>' + htmlError + '</ul>';
            Swal.fire({
                title: 'Information',
                html: htmlError,
                icon: 'error'
            });
        } else {
            Swal.fire({
                title: 'An unexpected error ocurred. Try again.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000
            });
        }
    }
}
