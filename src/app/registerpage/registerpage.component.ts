import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';

let name:String = "";
let states = [];
let productList = [];

interface product{
  name: String;
  details: String;
  category: String;
}



@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})

export class RegisterpageComponent implements OnInit {
  stateForm: FormGroup;
  values= "";

  states = [];
  productList = [];


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
         let sugesstedProductDetailList= JSON.parse(data.data);
         this.productList.push(sugesstedProductDetailList);
           for(let i = 0 ; i < sugesstedProductDetailList.length ; i++){
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

  // onRemove(value){
  //     var index1 = this.states.indexOf(value);
  //     this.states.splice(index1,1);
  //     this.productList.splice(index1,1);
  // }

  displayProduct(value){

    var index3 = this.productList.indexOf(value);
    console.log(this.productList);
    // var pdt: product = {
    //   name : productList[index3].productName,
    //   details : productList[index3].productDetails,
    //   category: productList[index3].productCategory
    // };
  }

}
