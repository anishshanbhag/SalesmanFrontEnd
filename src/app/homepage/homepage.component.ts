import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import swal from 'sweetalert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../config/config';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  data: any;
  authToken1: any;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['addpage']);
  }

  onExit() {
    localStorage.removeItem('staff');
    this.router.navigate(['']);
  }

  onOn() {
    this.data = localStorage.getItem('staff');
    this.authToken1 = JSON.parse(JSON.parse(this.data).data).authToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authToken': this.authToken1
      })
    };
    this.httpClient.post(API_ENDPOINT + '/api/v1/salesman/setActive', '', httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        if (data.response === '108202') {
          swal('ACTIVE');
        }
      });
  }

  onOff() {
    this.data = localStorage.getItem('staff');
    this.authToken1 = JSON.parse(JSON.parse(this.data).data).authToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authToken': this.authToken1
      })
    };
    this.httpClient.post(API_ENDPOINT + '/api/v1/salesman/unSetActive', '', httpOptions)
      .subscribe((data: any) => {
        if (data.response === '108202') {
          swal('INACTIVE');
        }
      });
  }

}
