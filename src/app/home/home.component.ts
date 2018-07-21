import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../config/config';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  authToken1: any;
  headers: any;
  data: any;
  constructor(private router: Router, private httpClient: HttpClient,private elementRef:ElementRef) {
    this.data = localStorage.getItem('staff');
    if(this.data!=null){
      if(JSON.parse(this.data).data!=null){
        console.log("Success");
        this.authToken1 = JSON.parse(JSON.parse(this.data).data).authToken;
        console.log(this.authToken1);
        if (this.data == null ) {
          router.navigate(['']);
        } else {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'authToken': this.authToken1
            })
          };
          httpClient.post('http://104.155.137.69:9000/api/v1/salesman/checkAuthToken', '', httpOptions)
            .subscribe((data: any) => {
              if (data.response === '108202') {
                this.router.navigate(['homepage']);
              }
            });
          }
      }else{
        console.log("fail");
        router.navigate(['']);
      }
    }

    console.log(this.data);
  }
  ngAfterViewInit(): void {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#00002E';
  }
  onSubmit(user, pass) {
    this.httpClient.post('http://104.155.137.69:9000/api/v1/salesman/checkSalesmanUser', {
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
        localStorage.setItem('staff', JSON.stringify(data));
      });
  }

  signUpPage() {
    this.router.navigate(['signup']);
  }
}
