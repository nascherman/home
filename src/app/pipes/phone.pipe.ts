import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber, ParsedNumber, TelephoneNumber } from "libphonenumber-js";

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, args?: string): any {
    if (!value) {
      return value;
    }

    return formatNumber(<TelephoneNumber>(`+1${value}`), 'National');
  }
}
