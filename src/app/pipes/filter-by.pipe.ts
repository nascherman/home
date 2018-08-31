import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(items: Array<any>, filterItem: any, keyField: string): any {
    return items.filter(i => {
      return i[keyField] !== filterItem[keyField]
    });
  }
}
