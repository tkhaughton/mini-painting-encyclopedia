import { Pipe, PipeTransform } from '@angular/core';

//Pipe that strips @s from entry descriptions in the search results
@Pipe({
  name: 'cleanDescription'
})
export class CleanDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    //Find all strings matching pattern @@text1~~text2@@ and return text1
    return value.replaceAll(new RegExp("@@.*?@@", "g"), (x) => {return x.slice(2, -2).split("~~")[0]})
    //return value.replaceAll(new RegExp("@@.*?@@", "g"), "blarg")
  }

}
