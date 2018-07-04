import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { Inject } from '@angular/core';
import { API_ENDPOINT } from '../../config/config';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  validationErrs: any = [];

  constructor(private router: Router, private httpClient: HttpClient) { }

  onSubmit(user, pass, confirmPass) {
    // console.log(user, pass, confirmPass);
    this.validationErrs = [];
    if (user === '') {
      this.validationErrs.push('Please enter a username');
    }
    if (pass === '') {
      this.validationErrs.push('Password cannot be empty');
    }
    if (pass === confirmPass) {
      this.httpClient.post('http://10.0.0.255:9000/api/v1/salesman/createSalesman', {
        'userName': user,
        'password': pass
      })
        .subscribe((data: any) => {
          localStorage.setItem('staff', JSON.stringify(data));
          if (data.response === 108403) {
            this.validationErrs.push('Username already exists');
          } else {
            if (this.validationErrs.length === 0) {
              localStorage.setItem('staff', JSON.stringify(data));
              this.router.navigate(['register']);
            }
          }
          // console.log(JSON.stringify(data));
        });
    } else {
      this.validationErrs.push('Passwords do not match');
    }
  }

  signInPage() {
    this.router.navigate(['']);
  }

  clearErrMsg(i) {
    setTimeout(() => {
      this.validationErrs.splice(i, 1);
    }, 1000);
  }

}
