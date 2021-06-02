import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  hideLoader(): void {
    document.getElementById("loader")!.style.display="none";
  }
}
