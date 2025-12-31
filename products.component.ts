import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  api = 'http://localhost:3000/api/products';

  products: any[] = [];
  product: any = {};
  editID: string|null = null;

  constructor(private http: HttpClient){
    this.getProducts();
  }

  getProducts(){
    this.http.get<any[]>(this.api).subscribe(
      data => this.products = data
    );
  }

  addProduct(){
    this.http.post(this.api, this.product).subscribe(() => {
      this.product = {};
      this.getProducts();
    });
  }

  editProduct(p:any){
    this.editID = p._id;
    this.product = { ...p };
  }

  updateProduct(){
    this.http.put(`${this.api}/${this.editID}`,this.product).subscribe(() => {
    this.editID = null;
    this.product = {};
    this.getProducts();
  });
  }

  deleteProduct(id: string){
    this.http.delete(`${this.api}/${id}`).subscribe(() =>
       this.getProducts());
  }

}
