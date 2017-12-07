import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'requestFilter'
})
export class RequestFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array,
                row => (
                    _.includes(row.name.toLowerCase(), query.toLowerCase()) ||
                    _.includes(row.subjects.toLowerCase(), query.toLowerCase())));
        }
        return array;
    }
}
