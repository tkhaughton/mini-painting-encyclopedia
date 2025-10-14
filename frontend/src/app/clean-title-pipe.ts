import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanTitle'
})
export class CleanTitlePipe implements PipeTransform {

  //replace title underscores with spaces and convert to title case
  transform(value: string): string {
    return value.replaceAll("_", " ")
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }

}
