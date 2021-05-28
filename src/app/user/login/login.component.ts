import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormControlValidationService} from "../../service/form-control-validation.service";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'mu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  displayEmailMessage!: string;
  displayPasswordMessage!: string;
  loginForm!: FormGroup;
  loginStatusMessage: string = '';
  private validationMessages = {
    email: {
      'required': 'Email is required',
      'emailPatternMatcher': 'Email should have a pattern like abc@pqr.xyz'
    },
    password: {
      'required': 'Password is required',
      'minlength': 'Password should be minimum of 8 characters'
    }
  };

  constructor(private router: Router, private formControlService: FormControlValidationService, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.formControlService.emailPatternMatcher]],
      password: ['', [Validators.minLength(8), Validators.required]]
    })

    const emailControl = this.loginForm.get('email');
    emailControl?.valueChanges.pipe(debounceTime(2000)).subscribe(
      value => this.setEmailMessage(emailControl)
    );
    const passwordControl = this.loginForm.get('password');
    passwordControl?.valueChanges.pipe(debounceTime(2000)).subscribe(
      value => this.setPasswordMessage(passwordControl)
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/home'])
      }
      this.loginStatusMessage = this.authService.message;
    }
  }

  setEmailMessage(control: AbstractControl): void {
    this.displayEmailMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayEmailMessage = Object.keys(control.errors).map(key => (<any>this.validationMessages.email)[key]).join(' ');
    }
  }

  setPasswordMessage(control: AbstractControl): void {
    this.displayPasswordMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayPasswordMessage = Object.keys(control.errors).map(key => (<any>this.validationMessages.password)[key]).join(' ');
    }
  }
}
