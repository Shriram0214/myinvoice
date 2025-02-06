import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authenticate.service';
import { AlertmessageService } from '../services/alertmessage.service';
import { GlobalConstants } from '../Type/global-constants';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  errormsg = '';
  formErrors = {
    username: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: AlertmessageService,
    private service:SessionService,
    
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Capture return URL or default to root
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Handles form validation errors.
   */
  validateForm(): void {
    this.formErrors = { username: '', password: '' };
    this.errormsg = '';

    if (this.f['username'].hasError('required')) {
      this.formErrors['username'] = 'User Name is required';
    }
    if (this.f['password'].hasError('required')) {
      this.formErrors['password'] = 'Password is required';
    }
  }

  
  onSubmit(): void {
    this.submitted = true;

    
    this.validateForm();

    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.f['username'].value);
    console.log(this.f['password'].value);
    
    this.loading = true;
    const credentials:any={
      loginname:this.f['username'].value,
      password:this.f['password'].value
    }
    this.authenticationService
      .login(credentials)
      .subscribe({
        next: (data: any) => {
         
        },
        error: (error: HttpErrorResponse) => {
          this.errormsg = error.error || 'An error occurred during login';
          this.notificationService.notify(
            'Login Failed',
            this.errormsg,
            GlobalConstants.NOTICE_ERROR
          );
          this.loading = false;
        },
      });
  }
}
