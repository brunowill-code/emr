import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { consumerPollProducersForChange } from "@angular/core/primitives/signals";

export function scopesGuard(scopes: string | string[]) {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const authService = inject(AuthService)
      const userScopes = authService.getUserScopes(); // Pega as roles do usuário
  
      if (Array.isArray(scopes)) {
        return scopes.some(scope => userScopes.includes(scope)); // Verifica se o usuário tem alguma das permissões
      }
      return userScopes.includes(scopes);
    };
}