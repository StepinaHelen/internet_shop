import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from './interfaces';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(products: IProducts[], type = ''): any {
    return products.filter((product) => {
      return product.type === type;
    });
  }
}
