import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products = [];
  productsSubscription: Subscription;
  removeSubscription: Subscription;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productService
      .getAllProducts()
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.removeSubscription.unsubscribe();
  }

  remove(id: string) {
    this.removeSubscription = this.productService
      .removeProduct(id)
      .subscribe((data) => {
        this.products = this.products.filter((data) => data.id !== id);
      });
  }
}
