import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../config/config';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any;
  authToken1: any;
  headers: any;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('staff'));
    console.log('data', this.data);

    if (this.data == null || !('data' in this.data)) {
      router.navigate(['']);
    } else {
      this.authToken1 = this.data.authToken;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authToken': this.authToken1
        })
      };
      httpClient.post(API_ENDPOINT + '/api/v1/salesman/checkAuthToken', '', httpOptions)
        .subscribe((data: any) => {
          if (data.response === '108202') {
            this.router.navigate(['homepage']);
          }
          console.log(data);
        });
    }
  }

  onSubmit(user, pass) {
    this.httpClient.post(API_ENDPOINT + '/api/v1/salesman/checkSalesmanUser', {
      'userName': user,
      'password': pass
    })
      .subscribe((data: any) => {
        if (data.response === '108200') {
          this.router.navigate(['homepage']);
        } else if (data.response === '108401') {
          alert('Username does not exist');
          window.location.reload();
        } else if (data.response === '108402') {
          alert('Username and password does not match');
          window.location.reload();
        }
      });
  }

  signUpPage() {
    this.router.navigate(['signup']);
  }
}
