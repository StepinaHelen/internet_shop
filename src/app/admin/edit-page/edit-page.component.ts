import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { IProducts } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: IProducts;
  submitted: boolean = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.productService.getProductById(params.id);
        })
      )
      .subscribe((product) => {
        this.product = product;
        this.form = this.fb.group({
          type: [product.type, [Validators.required]],
          title: [product.title, [Validators.required]],
          photo: [product.photo, [Validators.required]],
          info: [product.info, [Validators.required]],
          price: [product.price, [Validators.required]],
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    };

    this.productService
      .updateProduct({ ...this.product, ...product })
      .subscribe((data) => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      });
  }
}
