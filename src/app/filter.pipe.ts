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
          return items.filter(
              elem => {
                    if (elem.name)
                        return elem.name.toLowerCase().indexOf(searchText) > -1;
                    else if (elem.first_name && elem.last_name) {
                         const full_name = `${elem.first_name} ${elem.last_name}`;
                         return full_name.toLowerCase().indexOf(searchText) > -1;
                    }
                    else if (elem.description) {
                          return elem.description.toLowerCase().indexOf(searchText) > -1;
                    }
              }
          );
      }
}
