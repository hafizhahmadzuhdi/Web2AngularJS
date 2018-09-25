import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( elem => {
          return elem.description.toLowerCase().includes(searchText);
    });
   }
}



