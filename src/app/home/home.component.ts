import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';



let data;
let authToken1;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headers: any;
  constructor(private router:Router,private httpClient:HttpClient) {

          data = localStorage.getItem('staff')
          console.log(data);
          if(data.data === null){
            this.router.navigate[('')];
          }
          else if(data.data != null){
            let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
            const httpOptions = {
                  headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'authToken': authToken1
              })
            };
            httpClient.post('http://localhost:9000/api/v1/salesman/checkAuthToken','',httpOptions)
             .subscribe((data:any) =>{
                  if(data.response === '108202'){
                    this.router.navigate(['homepage'])
                  }
             }
           )
          }



   }

  ngOnInit() {
  }

  onSubmit(value1,value2){
    this.httpClient.post('http://localhost:9000/api/v1/salesman/checkSalesmanUser',{"userName":value1,
     "password": value2})
     .subscribe((data:any) =>{
        if(data.response === '108200'){
        this.router.navigate(['homepage']);
        }
        else if(data.response === '108401'){
            alert("Username does not exist")
              window.location.reload();
        }
        else if(data.response === '108402'){
          alert("Username and password does not match")
            window.location.reload();
        }
     }
   )
  }

  onClick(){
    this.router.navigate(['signup'])
  }
}
