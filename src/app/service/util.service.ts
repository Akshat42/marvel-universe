import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  emailPatternMatcher(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(re)) {
      return null;
    } else {
      return {'emailPatternMatcher': true};

    }
  }
}
