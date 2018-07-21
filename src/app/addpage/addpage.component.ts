import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { API_ENDPOINT } from '../../config/config';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';

let data;
let authToken1;

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})
export class AddpageComponent implements OnInit,AfterViewInit {

  selectedFile = null;
  value6 = "";
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }
  constructor(private router:Router,private httpClient:HttpClient,private elementRef: ElementRef) { }

  ngOnInit() {
  }

  onSubmit(value1,value2,value3,value4,value5){
    data = localStorage.getItem('staff')
    let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'authToken': authToken1
      })
    };
    console.log(data);
    this.httpClient.post('http://104.155.137.69:9000/api/v1/product/createProduct',{"productName":value1,
     "productCategory": value2,"productDetails":value5 ,"productMRP":value3,"productSellingPrice":value4},httpOptions)
     .subscribe((data:any) => {
       console.log(data);
       if(data.response === '108200'){
          this.router.navigate(['homepage']);
       }
      else{
         alert("Error while registering Product");
      }
      console.log(data);
     }
    )
    }

    goTo(){
      this.router.navigate(['homepage']);
    }
    resetPage(){
      window.location.reload();
    }
    // myImageClicked(event){
    //   this.selectedFile = event.target.files[0];
    //   this.value6 = this.selectedFile;
    // }
}
