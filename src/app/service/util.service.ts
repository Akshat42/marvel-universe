import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {
  }

  hideLoader(): void {
    document.getElementById("loader")!.style.display = "none";
  }
}
