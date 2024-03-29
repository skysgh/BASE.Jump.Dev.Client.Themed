import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../../../services/system.service';
import { System } from '../../../../../constants/contracts/system';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-base-core-modules-account_auth-twostep-basic',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})

/**
 * Two Step Basic Component
 */
export class BasicComponent implements OnInit {

  // set the current year
  year: number = new Date().getFullYear();

  public system: System;

  constructor(private systemService: SystemService, public translate: TranslateService) {
    this.system = this.systemService.system;
  }

  ngOnInit(): void {
  }

   /**
   * Confirm Otp Verification
   */
    config = {
      allowNumbersOnly: true,
      length: 4,
      isPasswordInput: false,
      disableAutoFocus: false,
      placeholder: '',
      inputStyles: {
        'width': '80px',
        'height': '50px'
      }
    };

}
