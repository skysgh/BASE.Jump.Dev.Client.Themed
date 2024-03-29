import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemService } from '../../../../../services/system.service';
import { System } from '../../../../../constants/contracts/system';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-base-core-modules-account_auth-signin-basic',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})

/**
 * Basic Component
 */
export class BasicComponent implements OnInit {

  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  system: System;

  constructor(private formBuilder: FormBuilder, systemService: SystemService, public translate: TranslateService) {

  this.system = systemService.system}

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
