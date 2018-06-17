import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onSubmit(value1,value2,value3){
    if(value1 === " "){
      alert("Hey put some words");
    }
    if(value2==value3){
      this.httpClient.post('http://localhost:9000/api/v1/salesman/createSalesman',{"userName":value1,
	     "password": value2})
       .subscribe((data:any) =>{
         // localStorage.setItem('staff',JSON.stringify(data));
         if(data.response === 108403){
            alert('Username already exists');
        }
        else{
           localStorage.setItem('staff',JSON.stringify(data));
             this.router.navigate(['register']);
        }
       }
     )
    }
    else{
      alert("Password's dont match");
    }

  }


}
