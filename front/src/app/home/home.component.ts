import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from "../services/product-service.service";
import { CartServiceService } from "../services/cart-service.service";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private prodApi: ProductServiceService, private cartPApi: CartServiceService,private router: Router) { }
  serverURL = environment.serverURL;
  removeItem = false;
  
  
  cartProductList: any = [];
  
  productList: any = [];
  listArray: string[] = [];
  sum = 5;
  direction = "";
  pagelimit = 5;
  pagestart = 0;

  ngOnInit(): void {
    this.getProductData();
    this.getCartData();
    
  }

  getProductData(){
    this.prodApi.getData('product').subscribe(async (res) => {
      if (res.status) {
        this.productList = res.data
        await this.appendItems();
      }
    })
  }

  addToCart(prodObj, fromprodList){
    prodObj.fromprodList = fromprodList;
    prodObj.qty = 1;
    this.prodApi.postData('cart', prodObj).subscribe(async (res) => {
      if(res.status){
        await this.getCartData();
        alert('Product added.')
      }
    });
  }

  getCartData(){
    this.cartPApi.getData('cart').subscribe(async (res) => {
      if (res.status) {
        this.cartProductList = res.data[0]
      }
    })
  }

  removeItemFromCart(cartid, productid) {
    this.removeItem = true;
    this.cartPApi.deleteData('cart/'+cartid+'/'+productid).subscribe( async (res) => {
      if (res.status) {
        await this.getCartData();
        this.removeItem = false;
        alert('Product removed.')
      }
    })
  }

  incDicNumber(cartid, productid, inc = false, dic = false, currentQty, change = false){
    if (inc == true) {
      currentQty = currentQty+1;
    } if (dic == true) {
      currentQty = currentQty == 1 ? currentQty : currentQty-1;
    } if(change = true) {
      currentQty = currentQty;
    }
    this.removeItem = true;
    this.cartPApi.getData('cart/' + cartid + '/' + productid + '/' + currentQty).subscribe(async (res) => {
      if (res.status) {
        await this.getCartData();
        this.removeItem = false;
      }
    })
  }


  // ===========
  onScrollDown(ev: any) {
    if (this.productList.lenght < this.listArray.length) {
    }
    this.pagestart += this.pagelimit;
    this.sum += 5;
    this.appendItems();
    this.direction = "scroll down";

  }

  appendItems() {
    this.addItems("push");
  }

  addItems(_method: string) {
    for (let i = this.pagestart; i < this.sum; ++i) {
      if (_method === 'push') {
        if(this.productList[i]){
          this.listArray.push(this.productList[i]);
        }else {
          break
        }
      } else if (_method === 'unshift') {
        this.listArray.unshift([i].join(""));
      }
    }
    
  }

}
