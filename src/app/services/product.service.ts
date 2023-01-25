import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFbResponse, IProducts } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  type: string = '';
  cartProducts: IProducts[] = [];

  constructor(private http: HttpClient) {}

  createProduct(product: any) {
    return this.http
      .post(`${environment.fbDataBaseUrl}/products.json`, product)
      .pipe(
        map((res: IFbResponse) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date),
          };
        })
      );
  }

  getAllProducts() {
    return this.http.get(`${environment.fbDataBaseUrl}/products.json`).pipe(
      map((res) =>
        Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }))
      )
    );
  }

  getProductById(id: string) {
    return this.http
      .get(`${environment.fbDataBaseUrl}/products/${id}.json`)
      .pipe(
        map((resp: IProducts) => {
          return {
            ...resp,
            id,
            date: resp.date,
          };
        })
      );
  }

  removeProduct(id: string) {
    return this.http.delete(`${environment.fbDataBaseUrl}/products/${id}.json`);
  }

  updateProduct(product: IProducts) {
    return this.http.patch(
      `${environment.fbDataBaseUrl}/products/${product.id}.json`,
      product
    );
  }

  setType(type: string) {
    this.type = type;
  }

  addProductToCart(product: IProducts) {
    this.cartProducts.push(product);
  }
}
