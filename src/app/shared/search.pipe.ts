import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from './interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProducts[], productName = ''): any {
    if (!productName.trim()) {
      return products;
    } else {
      return products.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(productName.toLocaleLowerCase());
      });
    }
  }
}
