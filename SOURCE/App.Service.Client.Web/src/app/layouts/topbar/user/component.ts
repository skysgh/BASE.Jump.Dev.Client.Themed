import { Component, Inject, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SystemService } from "../../../../_BASE/shared/services/system.service";
import { System } from "../../../../_BASE/shared/constants/contracts/system";
import { EventService } from "../../../../_BASE/shared/services/event.service";
import { DOCUMENT } from "@angular/common";
import { AuthenticationService } from "../../../../_BASE/shared/services/auth.service";
import { AuthfakeauthenticationService } from "../../../../_BASE/shared/services/authfake.service";
import { TokenStorageService } from '../../../../_BASE/shared/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frame-context-user',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class ContextUserComponent implements OnInit {

  system: System;


  userData: any;

  constructor(@Inject(DOCUMENT)
  private document: any,
    systemService: SystemService,
    public translate: TranslateService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private TokenStorageService: TokenStorageService,
    private router: Router
  ) {

    // Can be either via service, or injecting the constats/settings object:
    this.system = systemService.system;
  }

  ngOnInit(): void {
    this.initUser();
  }

  private initUser() {
    this.userData = this.TokenStorageService.getUser();
  };

  /**
 * Logout the user
 */
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}