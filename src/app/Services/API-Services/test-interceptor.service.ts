import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const updatedRequest = req.clone({
      withCredentials: true // Ensure credentials are sent
    });

    // Log the updated request headers

    return next.handle(updatedRequest);
  }

}
