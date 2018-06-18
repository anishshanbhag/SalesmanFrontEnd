import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

let data;
let authToken1;

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})
export class AddpageComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onSubmit(value1,value2,value3){
    data = localStorage.getItem('staff')
    let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'authToken': authToken1
      })
    };
    console.log(data);
    this.httpClient.post('http://localhost:9000/api/v1/product/createProduct',{"productName":value1,
     "productCategory": value2,"productDetails": value3},httpOptions)
     .subscribe((data:any) => {
       if(data.response === '108200'){
          this.router.navigate(['register']);
       }
      else{
         alert("Error while registering Product");
      }
     }
   )
  }



}
