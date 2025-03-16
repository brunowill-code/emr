import { inject } from "@angular/core";
import { CanActivateFn, GuardResult, MaybeAsync, Router } from "@angular/router";
import { catchError, map } from "rxjs";
import { AuthService } from "../services/auth.service";

export const authGuard = (): CanActivateFn => {
    

    
    return (): MaybeAsync<GuardResult> => {
        
        let VALID = true;
        const _authService = inject(AuthService);
        const _router = inject(Router);   
        return _authService.verifyToken().pipe(
            catchError(() => { 
                return _router.navigate(['login']);
            }),
            map(()=>{
                return true;
            })


        );    
          
    } 
}; 