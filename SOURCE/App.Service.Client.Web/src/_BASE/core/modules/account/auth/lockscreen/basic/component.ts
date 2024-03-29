import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { System } from '../../../../../constants/contracts/system';
import { SystemService } from '../../../../../services/system.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-base-core-modules-account_auth-lockscreen-basic',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})

/**
 * Lock Screen Basic Component
 */
export class BasicComponent implements OnInit {

  // Login Form
  lockscreenForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  system: System;

  constructor(private formBuilder: FormBuilder, systemService: SystemService, public translate: TranslateService) {
    this.system = systemService.system;
  }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.lockscreenForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.lockscreenForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.lockscreenForm.invalid) {
      return;
    }
  }

}
