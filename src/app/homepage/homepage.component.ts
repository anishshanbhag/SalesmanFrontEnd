import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import swal from 'sweetalert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../config/config';
import {Observable} from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
// import {ToasterModule, ToasterService} from 'angular5-toaster';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  data: any;
  authToken1: any;
  idOfSalesman: any;
  subscription :any;
  isNotActive = false;
  isSetActive = false;
  state = false;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.data = localStorage.getItem('staff');
    this.authToken1 = JSON.parse(JSON.parse(this.data).data).authToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authToken': this.authToken1
      })
    };
    this.httpClient.post('http://10.0.0.255:9000/api/v1/salesman/unSetOccupied', '', httpOptions)
      .subscribe((data: any) => {
         console.log(data);
      });
      this.httpClient.post('http://10.0.0.255:9000/api/v1/salesman/checkIfActive', '', httpOptions)
        .subscribe((data: any) => {
            if(data.response == 108206){
              this.state = false;
            }
            if(data.response == 108205){
              this.state=true;
              this.onOn();
            }
        });
   }
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
    this.idOfSalesman = JSON.parse(JSON.parse(this.data).data).id;
    this.authToken1 = JSON.parse(JSON.parse(this.data).data).authToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authToken': this.authToken1
      })
    };
    this.httpClient.post('http://10.0.0.255:9000/api/v1/salesman/setActive', '', httpOptions)
      .subscribe((data: any) => {
        // console.log(data);
        if (data.response === '108200') {
          swal('ACTIVE');
        }
      });
    this.subscription = Observable.interval(5000)
								.subscribe(() => {
                  this.httpClient.post('http://10.0.0.255:9000/api/v1/room/getRoom', {'id':this.idOfSalesman}, httpOptions)
                    .subscribe((data: any) => {
                      let id = JSON.parse(data.data).id;
                      if(id != undefined){
                        this.unsubscribeMe();
                        this.data = localStorage.getItem('staff');
                        this.authToken1 = JSON.parse(JSON.parse(this.data).data).authToken;
                        const httpOptions = {
                          headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'authToken': this.authToken1
                          })
                        };
                        this.httpClient.post('http://10.0.0.255:9000/api/v1/salesman/setOccupied', '', httpOptions)
                          .subscribe((data: any) => {
                             console.log(data);
                             window.open('https://joeydash.herokuapp.com/'+id,"_top");
                          });
                      }

                      console.log(data);
                    });
								});
        }
  unsubscribeMe(){
    this.subscription.unsubscribe();
  }

  onOff() {
    console.log("Inactive");
    this.data = localStorage.getItem('staff');
    this.authToken1 = JSON.parse(JSON.parse(this.data).data).authToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authToken': this.authToken1
      })
    };
    this.httpClient.post('http://10.0.0.255:9000/api/v1/salesman/unSetActive', '', httpOptions)
      .subscribe((data: any) => {
        if (data.response === '108200') {
          swal('INACTIVE');
        }
      });
  }
  onChange(event){
      if(event==true){
        this.onOn();
      }
      if(event==false){
        this.onOff();
      }
  }
    // let checkBox = document.getElementById("slide-five");
    //   function checkIt() {
    //     console.log(checkBox.checked);
    //   }
    //   makeItActive();
    //   function makeItActive(){
    //     checkBox.checked = true;
    //   }
    //   function makeItInActive(){
    //     checkBox.checked = false;
    //   }
    //   checkIt();
}
