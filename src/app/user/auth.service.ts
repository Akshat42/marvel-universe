import {Injectable} from '@angular/core';


const userDetails = {
  users: [
    {'name': "Madhuri", 'email': "madhurim@infrrd.ai", 'password': "12345678"},
    {'name': "Rachana", 'email': "rachana@infrrd.ai", 'password': "qwertyui"},
    {'name': "Kavil", 'email': "kavil@infrrd.ai", 'password': "asdfghjk"},
    {'name': "Akshat", 'email': "akshat@infrrd.ai", 'password': "zxcvbnm,"},
  ]
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  message: string = '';
  loginStatus = false;
  redirectUrl: any;
  loginStatusChecker: boolean = false;

  public login(email: string, password: string): string {
    let item = userDetails.users.find((item) => item.email === email && item.password === password);
    if (item) {
      this.loginStatus = true;
      localStorage.setItem("username", JSON.stringify(item.name));
      localStorage.setItem('loginStatus', String(this.loginStatus));
      this.message = "Login Successful"
    } else {
      this.message = "Check Your Credentials";
    }
    return this.message;
  }

  get isLoggedIn(): boolean {
    if (localStorage.getItem('loginStatus') === 'true') {
      this.loginStatusChecker = true;
    }
    return this.loginStatusChecker;
  }


  public logout() {
    this.loginStatus = false
    localStorage.removeItem('username');
    localStorage.setItem('loginStatus', String(this.loginStatus))
  }
}
