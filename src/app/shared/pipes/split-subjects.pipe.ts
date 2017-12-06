import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'splitSubjects'
})
export class SplitSubjectsPipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      return _.split(value, ',');
    }
    return value;
  }

}
