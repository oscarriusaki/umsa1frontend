import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipePipe implements PipeTransform {

  transform(value: string,todas:boolean=false): string {
    if(value){
      value = value.toLocaleLowerCase()
  
      let dato = value.split(' ');
      if(todas){
        dato = dato.map( nombre =>{
          return nombre[0].toUpperCase() + nombre.substring(1)
        })
      }else{
        dato[0] = dato[0][0].toUpperCase() + dato[0].substring(1);
      }
  
      const p = dato.join(' ')
 
      return p;
    }else{
      return ''
    }
  }
}
