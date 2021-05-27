import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UtilService} from "../../service/util.service";

// const errorMessages = {
//   'email': {
//     'required': "Email is Required",
//     'emailPatternMatcher': "Email should have a pattern like abc@pqr.xyz"
//   },
//   'password': {
//     'required': "Password is required",
//     'minlength': "Password should be minimum of 8 characters"
//   }
// }

@Component({
  selector: 'mu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  loginForm: FormGroup;
  isSubmitted:boolean = false;
  loginStatusMessage: string ='';
  constructor(private router: Router, private utilService: UtilService, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.utilService.emailPatternMatcher]],
      password: ['', [Validators.minLength(8), Validators.required]]
    })
  }

  onSubmit(): void {
    this.isSubmitted = true;
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
}

