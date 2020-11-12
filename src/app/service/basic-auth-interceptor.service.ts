import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem("username") && sessionStorage.getItem("token")) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
    }
    // console.log("Basic aut to handle request;" + req.params);

    return next.handle(req);
  }
}
