import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { IProducts } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: IProducts[] = [];
  productsSubscription: Subscription;
  removeSubscription: Subscription;
  productName: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productService
      .getAllProducts()
      .subscribe((data: IProducts[]) => {
        this.products = data;
      });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }

  remove(id: string) {
    this.removeSubscription = this.productService
      .removeProduct(id)
      .subscribe((data: IProducts[]) => {
        this.products = this.products.filter((data) => data.id !== id);
      });
  }
}
