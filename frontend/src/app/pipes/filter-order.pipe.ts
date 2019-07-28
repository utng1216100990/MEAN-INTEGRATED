import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrder'
})
export class FilterOrderPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultOrder = [];
    for (const order of value) {
      if (order.type.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultOrder.push(order);
      }
    }
    return resultOrder;
  }

}