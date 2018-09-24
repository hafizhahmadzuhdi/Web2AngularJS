import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

    transform(items: any[], searchText: string) {
          if (searchText == null)
              searchText = "";
          searchText = searchText.toLowerCase();
          return items.filter(elem => elem.name.toLowerCase().indexOf(searchText) > -1);
      }
}
