import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itos'
})
export class ItosPipe implements PipeTransform {

  transform(value: number): string {
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum: number = Math.floor(("" + value).length / 3);
    let shortValue: any = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  }

}
