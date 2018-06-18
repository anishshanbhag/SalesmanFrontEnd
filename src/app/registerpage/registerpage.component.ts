import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';

let name:String = "";
let states = [];
let productList = [];
let registeredProduct = [];


interface product{
  id : number;
  name: String;
  details: String;
  category: String;
}

var pdt : product;

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})

export class RegisterpageComponent implements OnInit {
  stateForm: FormGroup;
  values= "";
   count=0;
pdt : product;
  states = [];
  productList = [];
  registeredProduct = [];


  showDropDown = false;

  constructor(private router:Router,private httpClient:HttpClient,private fb: FormBuilder) {
      this.initForm();
      
  }
  initForm(): FormGroup {
    return this.stateForm = this.fb.group({
      search: [null]
    })
  }
  ngOnInit() {
  }
  clicked(){
    this.showDropDown = !this.showDropDown;
  }
  onClick(){
    this.router.navigate(['addpage']);
  }
  onNext(){
    this.router.navigate(['homepage']);
  }
  onKey(event :any){
    this.values = event.target.value;
    if(this.values.length >= 4){
      this.httpClient.post('http://localhost:9000/api/v1/product/searchProduct',{"queryString":this.values})
       .subscribe((data:any) =>{
         this.states = [];
         this.productList = [];
         let sugesstedProductDetailList = JSON.parse(data.data);
           for(let i = 0 ; i < sugesstedProductDetailList.length ; i++){
             this.productList.push(sugesstedProductDetailList[i]);
             this.states.push(sugesstedProductDetailList[i].productName);
           }
       });

    }
  }
  getSearchValue() {
    return this.stateForm.value.search;
  }
  selectValue(value) {
   this.stateForm.patchValue({"search": value});
   this.showDropDown = false;
 }
  closeDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  openDropDown() {
    this.showDropDown = false;
  }



  displayProduct(value){
    for(let i=0;i<this.productList.length;i++){
      if(this.productList[i].productName === value){
         this.pdt = {
           id : this.productList[i].id,
          name : this.productList[i].productName,
          details : this.productList[i].productDetails,
          category: this.productList[i].productCategory
        };
      }
    }
  }

  onRegister(){
    let data = localStorage.getItem('staff');
    let id = JSON.parse(JSON.parse(data).data).id;
    let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'authToken': authToken1
      })
    };
    this.httpClient.post('http://localhost:9000/api/v1/productSalesman/createProductSalesman',{
      "productId" : this.pdt.id,
      "salesmanId" :id
    },httpOptions)
     .subscribe((data:any) =>{
          if(data.response === '108200'){
            this.registeredProduct.push(this.pdt.name);
          }
     }
   )
     console.log(this.registeredProduct);
  }

  onRemove(value4){
    let index3 = this.registeredProduct.indexOf(value4);
      this.registeredProduct.splice(index3,1);
  }

}
