import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import swal from 'sweetalert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../config/config';
import {Observable} from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Inject } from '@angular/core';
// import {ToasterModule, ToasterService} from 'angular5-toaster';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit ,AfterViewInit{
  data: any;
  authToken1: any;
  idOfSalesman: any;
  subscription :any;
  isNotActive = false;
  isSetActive = false;
  state = false;
  checkboxValue:boolean ;
  checked:boolean;


  constructor(private router: Router, private httpClient: HttpClient,private elementRef: ElementRef) {
    this.data = localStorage.getItem('staff');
    if(this.data!=null){
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
                this.checked = false;
                this.makeItInActive();
              }
              if(data.response == 108205){
                this.checked=true;
                this.onOn();
                this.makeItActive();
              }
          });
    }
   }
   ngAfterViewInit(): void {
     this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#00002E';
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
          // swal('ACTIVE');
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
          // swal('INACTIVE');
        }
      });
  }
  // onChange(event){
  //     if(event==true){
  //       this.onOn();
  //     }
  //     if(event==false){
  //       this.onOff();
  //     }
  // }
  getUrl(){
    return "url('VW-12.png')";
  }
    // let checkBox = document.getElementById("slide-five");
    //   function checkIt() {
    //     console.log(checkBox.checked);
    //   }
    //   makeItActive();
       makeItActive(){
        this.checkboxValue = true;
      }
       makeItInActive(){
        this.checkboxValue = false;
      }
    //   checkIt();
    clicked(){
      if(this.checkboxValue){
        this.checked = true;
        this.onOn();
      }
      else{
        this.checked = false;
        this.onOff();
      }
    }


}
