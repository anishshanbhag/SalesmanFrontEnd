import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../config/config';

let name: String = "";
let states = [];
let productList = [];



interface product {
	id: number;
	name: String;
	details: String;
	category: String;
}

var pdt: product;
interface registeredProduct{
  id : number;
  name : String;
}

var rpdt: registeredProduct[];
@Component({
	selector: 'app-registerpage',
	templateUrl: './registerpage.component.html',
	styleUrls: ['./registerpage.component.css']
})

export class RegisterpageComponent implements OnInit {
	stateForm: FormGroup;
	values = "";
	count = 0;
	pdt: product;
	states = [];
	productList = [];
	rpdt: registeredProduct[] = [];

	showDropDown = false;

	constructor(private router: Router, private httpClient: HttpClient, private fb: FormBuilder) {
		this.initForm();
		let data;
		data = localStorage.getItem('staff')
		let id = JSON.parse(JSON.parse(data).data).id;
		let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'authToken': authToken1
			})
		};
		httpClient.post('http://104.155.137.69:9000/api/v1/productSalesman/getProductIdSalesmanIdMappingList', { "salesmanId": id }, httpOptions)
			.subscribe((data: any) => {
				rpdt = data.data;
			}
			)
		console.log(data);
	}
	initForm(): FormGroup {
		return this.stateForm = this.fb.group({
			search: [null]
		})
	}
	ngOnInit() {
	}
	clicked() {
		this.showDropDown = !this.showDropDown;
	}
	onClick() {
		this.router.navigate(['addpage']);
	}
	onNext() {
		this.router.navigate(['homepage']);
	}
	// onKey(event: any) {
	// 	this.values = event.target.value;
	// 	const httpOptions = {
	// 		headers: new HttpHeaders({
	// 			'Content-Type': 'application/json'
	// 		})
	// 	};
	// 	if (this.values.length >= 4) {
	// 		this.httpClient.post('http://10.0.0.255:9000/api/v1/product/searchProduct', { "queryString": this.values })
	// 			.subscribe((data: any) => {
	// 				this.states = [];
	// 				this.productList = [];
	// 				let sugesstedProductDetailList = JSON.parse(data.data);
	// 				for (let i = 0; i < sugesstedProductDetailList.length; i++) {
	// 					this.productList.push(sugesstedProductDetailList[i]);
	// 					this.states.push(sugesstedProductDetailList[i].productName);
	// 				}
	// 			});
	// 		this.httpClient.get('http://10.0.0.255:9000/api/v1/product/searchProduct?query='+this.values,httpOptions)
	// 		 	.subscribe((data: any) => {
	// 		 		this.states = [];
	// 		 		this.productList = [];
	// 		 		let sugesstedProductDetailList = JSON.parse(data.data);
	// 		 		for (let i = 0; i < sugesstedProductDetailList.length; i++) {
	// 		 			this.productList.push(sugesstedProductDetailList[i]);
	// 		 			this.states.push(sugesstedProductDetailList[i].productName);
	// 				}
	// 			});
	// 	}
	// }
	onKey(event: any) {
					this.values = event.target.value;
					const httpOptions = {
						headers: new HttpHeaders({
							'Content-Type': 'application/json'
						})
					};
					if (this.values.length >= 4) {
						this.httpClient.get('http://104.155.137.69:9000/api/v1/product/searchProduct?query='+this.values,httpOptions)
						 	.subscribe((data: any) => {
			          console.log(data);
						 		this.states = [];
						 		this.productList = [];
						 		let sugesstedProductDetailList = JSON.parse(data.data);
						 		for (let i = 0; i < sugesstedProductDetailList.length; i++) {
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
		this.stateForm.patchValue({ "search": value });
		this.showDropDown = false;
		this.displayProduct(value);
	}
	closeDropDown() {
		this.showDropDown = !this.showDropDown;
	}

	openDropDown() {
		this.showDropDown = false;
	}



	displayProduct(value) {
		for (let i = 0; i < this.productList.length; i++) {
			if (this.productList[i].productName === value) {
				this.pdt = {
					id: this.productList[i].id,
					name: this.productList[i].productName,
					details: this.productList[i].productDetails,
					category: this.productList[i].productCategory
				};
			}
		}
	}

	onRegister() {
		let data = localStorage.getItem('staff');
		let id = JSON.parse(JSON.parse(data).data).id;
		let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'authToken': authToken1
			})
		};
		this.httpClient.post('http://104.155.137.69:9000/api/v1/productSalesman/createProductSalesman', {
			"productId": this.pdt.id,
			"salesmanId": id
		}, httpOptions)
			.subscribe((data: any) => {
				if (data.response === '108200') {
					this.rpdt.push({ id: this.pdt.id, name: this.pdt.name });
				}
				console.log(this.rpdt[0].id);
			}
			)
	}


	onRemove(value4) {

		let pdtId;
		for (let i = 0; i < this.rpdt.length; i++) {
			if (this.rpdt[i].name === value4.name) {
				pdtId = this.rpdt[i].id;
			}
		}
		// let pdtId = this.rpdt.filter((prod) => {prod.name === value4.name})[0].id;

		let data = localStorage.getItem('staff');
		let id = JSON.parse(JSON.parse(data).data).id;
		let authToken1 = JSON.parse(JSON.parse(data).data).authToken;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'authToken': authToken1
			})
		};
		this.httpClient.post('http://104.155.137.69:9000/api/v1/productSalesman/removeSalesmanProduct', {
			"productId": pdtId,
			"salesmanId": id
		}, httpOptions)
			.subscribe((data: any) => {
				if (data.response === '108200') {
					for (let i = 0; i < this.rpdt.length; i++) {
						if (this.rpdt[i].name === value4.name) {
							this.rpdt.splice(i, 1);
						}
					}
				}
			});
	}

}
