import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  type = 'Phone';
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  setType(type: string) {
    this.type = type;
    if (this.type !== 'Cart') {
      this.router.navigate(['/'], {
        queryParams: {
          type,
        },
      });
    }
    this.productService.setType(type);
  }
}
