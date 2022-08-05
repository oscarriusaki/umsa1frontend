import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objArray'
})
export class ObjArrayPipe implements PipeTransform {

  transform(value: any=[]): any {
    return Object.values(value);
  }

}
