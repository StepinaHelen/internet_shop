import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  form: FormGroup;
  cartProducts = [];
  totalPrice = 0;
  submitted = false;
  added = '';
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProducts;
    this.totalPrice = this.cartProducts.reduce((acc, el) => {
      return Number(el.price) + acc;
    }, this.totalPrice);

    this.form = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      payment: [null, [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date(),
      orders: this.cartProducts,
    };

    this.orderService.createOrder(order).subscribe((data) => {
      this.form.reset();
      this.submitted = false;
      this.added = 'Delivery is framed';
    });
  }

  delete(cartProduct: any) {
    this.totalPrice -= +cartProduct.price;
    this.cartProducts.splice(this.cartProducts.indexOf(cartProduct), 1);
  }
}
