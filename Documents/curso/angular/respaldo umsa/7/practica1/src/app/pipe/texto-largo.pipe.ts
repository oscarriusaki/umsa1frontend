import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textoLargo'
})
export class TextoLargoPipe implements PipeTransform {

  transform(value: string, todas:boolean=false ): string {
    if(value){
        value = value.toLocaleLowerCase();
        let data = value.split(' ');
        if(todas){
          data =data.map(resp =>{
            return resp[0].toLowerCase()+resp.substring(1);
          })
        }else{
          data[0] = data[0][0].toLowerCase()+data[0].substring(1);
        }
        
      const p = data.join(' ')
      if(p.length >= 200){
        return p.substring(0,130)+'...';
      }else{
        return p;
      }  
    }else{  
      return '';
    }
  }
}
