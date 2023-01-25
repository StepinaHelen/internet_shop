import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit {
  orders: any[] = [];
  ordersSubscription: Subscription;
  removeSubscription: Subscription;
  productName: string;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.ordersSubscription = this.orderService
      .getAllOrders()
      .subscribe((data: any[]) => {
        this.orders = data;
      });
  }

  ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }

  remove(id: string) {
    this.removeSubscription = this.orderService
      .removeOrder(id)
      .subscribe(() => {
        this.orders = this.orders.filter((data) => data.id !== id);
      });
  }
}
