import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UtilService} from "../../service/util.service";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'mu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  displayEmailMessage: string;
  // @ts-ignore
  displayPasswordMessage:string;
  // @ts-ignore
  loginForm: FormGroup;
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

  constructor(private router: Router, private utilService: UtilService, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.utilService.emailPatternMatcher]],
      password: ['', [Validators.minLength(8), Validators.required]]
    })
    this.loginForm.get('email')?.valueChanges.subscribe(selectedValue => {
    });

    const emailControl = this.loginForm.get('email');
    emailControl?.valueChanges.subscribe(
      value => this.setEmailMessage(emailControl)
    );
    const passwordControl = this.loginForm.get('password');
    passwordControl?.valueChanges.subscribe(
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

  setEmailMessage(c: AbstractControl): void {
    this.displayEmailMessage = '';
    if ((c!.touched || c!.dirty) && c!.errors) {
      this.displayEmailMessage = Object.keys(c.errors).map(key => (this.validationMessages.email as any)[key]).join(' ');
    }
  }
  setPasswordMessage(c: AbstractControl): void {
    this.displayPasswordMessage = '';
    if ((c!.touched || c!.dirty) && c!.errors) {
      this.displayPasswordMessage = Object.keys(c.errors).map(key => (this.validationMessages.password as any)[key]).join(' ');
    }
  }
}

