import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {
  fechaActual:Date = new Date();
  transform(value: Date, todas:boolean=true): string {
    
    let parametro='';

    let s=new Date(value);

    let anio=s.getFullYear();
    let mes=s.getMonth()+1;
    let dia=s.getDate();
    let hora=s.getHours();
    let minuto=s.getMinutes();
    let segundo=s.getMinutes();
    let anio2=this.fechaActual.getFullYear();
    let mes2=this.fechaActual.getMonth()+1;
    let dia2=this.fechaActual.getDate();
    let hora2=this.fechaActual.getHours()-4;
    let minuto2=this.fechaActual.getMinutes()+3;
    let segundo2=this.fechaActual.getSeconds();
    
    if(minuto < 0){
      minuto = Number(minuto) * (-1);
    }
    if(minuto2 < 0){
      minuto2 = Number(minuto2) * (-1);
    }
    if(segundo < 0){
      segundo = Number(segundo) * (-1);
    }
    if(segundo2 < 0){
      segundo2 = Number(segundo2) * (-1);
    }
    if(hora < 0){
      hora = Number(hora) * (-1);
    }
    if(hora2 < 0){
      hora2 = Number(hora2) * (-1);
    }
 
    if(anio===anio2){
        if(mes===mes2){
            if(dia===dia2){
              if(hora===hora2){
                if(Number(minuto)===Number(minuto2)){
                  if((Number(segundo2)-Number(segundo))<0){
                    parametro = 'hace algunos instantes';
                  }else{
                    parametro=(segundo2-segundo)+' s';
                  }
                }else{
                    parametro=''+(minuto2-minuto);
                    if(Number(parametro)===1){
                      parametro=`hace ${parametro} minuto`;
                    }else{
                      parametro=`hace ${parametro} minutos`;
                    }
                }
              }else{
                parametro=``+(hora2-hora);
                if(Number(parametro)===1){
                  parametro=`hace ${parametro} hora`;
                }else{
                  parametro=`hace ${parametro} horas`;
                }
              }
            }else{
              parametro=``+(dia2-dia);
              if(Number(parametro)===1){
                parametro=`hace ${parametro} dia`;
              }else{
                parametro=`hace ${parametro} dias`;
              }
            }
        }else{
          parametro=``+(mes2-mes);
          if(Number(parametro)===1){
            parametro=`hace ${parametro} mes`;
          }else{
            parametro=`hace ${parametro} meses`;
          }
        }
    }else{
      parametro=``+(anio2-anio);
      if(Number(parametro)===1){
        parametro=dia2+`/`+mes2+`/`+anio;
      }else{
        parametro=dia2+`/`+mes2+`/`+anio;
      }
    }
    return parametro;
  }
}