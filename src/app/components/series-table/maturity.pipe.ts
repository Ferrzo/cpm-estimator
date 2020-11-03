import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maturityPipe'
})
export class MaturityPipe implements PipeTransform {

  transform(value: number): string {
    const year = value.toString().slice(0, 4);
    const month = value.toString().slice(4);
    return `${month}/${year}`;
  }

}
