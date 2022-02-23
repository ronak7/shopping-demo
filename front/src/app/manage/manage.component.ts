import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { environment } from "../../environments/environment";

declare var $;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  product: any = {};
  productList: any = [];
  serverURL = environment.serverURL;
  productDataForEdit: any = {}
  /* Variabe to store file data */
  filedata: File = null;
  constructor(private prodApi: ProductServiceService) { }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.prodApi.getData('product').subscribe(res => {
      if (res.status) {
        this.productList = res.data
      }
    })
  }
    
  upload(e) {
    var file = <File>e.target.files[0];
    var fileName = file.name;
    var ext = fileName.split('.').pop();
    this.product.file = file;
    
    if (ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "PNG" || ext == "JPEG" || ext == "JPG" || ext == "webp" || ext == "WEBP") {
        this.filedata = <File>e.target.files[0];
    } else {
      alert("Please select proper file");
      return false;
    }
  }

  createProduct(product){
    let fb: FormData = new FormData();
    fb.append('file', this.filedata, this.filedata.name);
    fb.append('name', product.value.name);
    fb.append('price', product.value.price);
    this.prodApi.postData('product', fb).subscribe(async (res) => {
      if (res.status) {
        await this.getProductData();
        alert('Product added.')
        product.resetForm(); 
        this.product = {}
      }
    })
  }


  deleteProduct(id){
    var result = confirm("Want to delete?");
    if (result) {
      this.prodApi.deleteData('product/'+id).subscribe( async(res) => {
        if (res.status) {
          await this.getProductData();
          
        }
      })
    }
  }

  updateproduct(id){
    this.prodApi.getData("product/" + id).subscribe(async (res) => {
      if (res.status) {
        this.product = res.data[0]
        $("#myModal").modal()
      }
    })
  }

  
  updateproductdata(product){

    let fb: FormData = new FormData();
    if (this.filedata != null) {
      fb.append('file', this.filedata, this.filedata.name);
    }
    fb.append('name', product.value.name);
    fb.append('price', product.value.price);
    
    this.prodApi.putData("product/" + this.product._id, fb).subscribe(async (res) => {
      if (res.status) {
        product.resetForm();
        this.product = {}
        $('#myModal').modal('toggle');
        await this.getProductData();
        alert('Product updated.')
      }
    })
  }

}
