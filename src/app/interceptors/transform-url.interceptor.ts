// import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { environments } from '../../environments/environment';

// export const transformUrlInterceptor: HttpInterceptorFn = (
//   req: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ) => {
//   console.log('interceptor called');
//   const { baseURL } = environments;
//   const newRequest = req.clone({
//     url: baseURL + req.url,
//   });
//   console.log(newRequest);
//   return next(newRequest);
// };

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environments } from '../../environments/environment';

@Injectable()
export class TransformUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { baseURL } = environments;
    const newRequest = request.clone({ url: baseURL + request.url });
    console.log(newRequest);
    return next.handle(newRequest).pipe(tap(event=>{
      if(event instanceof HttpResponse){
        console.log(event.body);
        console.log("hello");
      }
    }));
  }
}
