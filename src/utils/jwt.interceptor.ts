import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isApiUrl && this.authenticationService.userJwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.userJwtToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
