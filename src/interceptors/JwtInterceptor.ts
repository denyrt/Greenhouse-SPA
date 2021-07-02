import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tokenGetter } from "src/app/app.module";
import { IdentityService } from "src/services/api/identity.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private identity: IdentityService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req.clone(
            { 
                headers: req.headers.set('Authorization', 'Bearer ' + tokenGetter())
            });
        
        return next.handle(request);
    }
}
