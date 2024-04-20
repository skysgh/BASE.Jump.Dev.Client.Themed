// Ag:
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Const:
import { system as importedSystemConst } from '../constants/system';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  // Make system/env variables avaiable to class & view template:
  public system = importedSystemConst;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (environment.defaultauth === 'firebase') {
            const currentUser = this.authenticationService.currentUser();
            if (currentUser) {
                // logged in so return true
                return true;
            }
        } else {
            const currentUser = this.authFackservice.currentUserValue;
            if (currentUser) {
                // logged in so return true
                return true;
            }
            // check if user data is in storage is logged in via API.
          if (sessionStorage.getItem(this.system.storage.system.currentUser)) {
                return true;
        }
        // not logged in so redirect to login page with the return url
            }
        this.router.navigate([this.system.navigation.auth.login], { queryParams: { returnUrl: state.url } });
        return false;
    }
}