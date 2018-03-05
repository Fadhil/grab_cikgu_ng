import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  // function toTime(timeString) {
  //     var timeTokens = timeString.split(':');
  //     return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
  // }

  transform(value: any, args?: any): any {
    console.log(value);
    var timeTokens = value.split(':');
    return new Date(1970,0,1, timeTokens[0], timeTokens[1]);
  }

}
