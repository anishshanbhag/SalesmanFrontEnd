import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import swal from 'sweetalert';
import { HttpClient , HttpHeaders} from '@angular/common/http';

let data;
let authToken1;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onClick(){
    this.router.navigate(['addpage']);
  }

  onExit(){
    localStorage.removeItem('staff');
    this.router.navigate(['']);
  }

  onOn(){
    data = localStorage.getItem('staff')
    let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'authToken': authToken1
      })
    };
    this.httpClient.post('http://localhost:9000/api/v1/salesman/setActive','',httpOptions)
     .subscribe((data:any) =>{
       console.log(data);
          if(data.response === '108202'){
            swal("ACTIVE");
          }
     })
  }

  onOff(){
    data = localStorage.getItem('staff')
    let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'authToken': authToken1
      })
    };
    this.httpClient.post('http://localhost:9000/api/v1/salesman/unSetActive','',httpOptions)
     .subscribe((data:any) =>{
          if(data.response === '108202'){
            swal("INACTIVE");
          }
     })

  }

}
