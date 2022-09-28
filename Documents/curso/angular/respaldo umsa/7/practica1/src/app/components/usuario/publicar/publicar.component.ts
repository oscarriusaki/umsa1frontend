import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../../services/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {

  data:any={
    data:'Seleccione una opcion'
  }
  enfermedades:any=[
    'Alergia',
    'Ántrax',
    'Asma',
    'Autismo',
    'Artritis',
    'Anemia',
    'Cáncer',
    'Clamidia',
    'Culebrilla (herpes zóster)',
    'Déficit de atención e hiperactividad',
    'Diabetes',
    'Ébola',
    'Embarazo y ETS',
    'Enfermedades de transmisión sexual (ETS)',
    'Enfermedad inflamatoria pélvica (EIP)',
    'Enfermedad pulmonar obstructiva crónica',
    'Epilepsia',
    'Escarlatina',
    'Estreptococo del grupo B',
    'Gonorrhea',
    'Haemophilus influenzae tipo b (Hib)',
    'Hemofilia',
    'Herpes genital',
    'Infeccíon genital por VPH',
    'Influenza (gripe)',
    'La Salud Mental de los Niños (Children’s Mental Health)',
    'Listeria (Listeriosis)',
    'Meningitis',
    'Neumonía',
    'Paperas',
    'Poliomielitis',
    'Rabia',
    'Reumatismo',
    'Rotavirus',
    'Shigella – Shigellosis',
    'Sífilis',
    'Silicosis',
    'Síndrome alcohólico fetal',
    'Síndrome de fatiga crónica (SFC)',
    'Síndrome de Tourette',
    'Tabaquismo',
    'Tosferina',
    'Tricomoniasis',
    'Tuberculosis (TB)',
    'Vaginosis bacteriana',
    'VIH/Sida',
    'Zika',
    '#otro',
    ]
  constructor(private servicio:ServiceService,
              private router:Router,  
              private _snackBar:MatSnackBar) {
  }
  ngOnInit(): void {
 
  }
  openSnackBar() {
    this._snackBar.open('Publicado', '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  enviar(f:NgForm){
    if((f.form.value.descripcion === '') || 
    (f.form.value.contenido === '') || 
    (f.form.value.tipoEnfermedad.nombre === "Seleccione una opcion")||
    (f.form.value.tipoEnfermedad === "Seleccione una opcion")||
    (f.form.value.tipoEnfermedad === undefined )){
      return ;
  }
  if(f.invalid){
    return ;
  }
    this.servicio.publicar(f.form.value.descripcion,f.form.value.contenido,this.enfermedades[f.form.value.tipoEnfermedad])
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          window.location.reload();
        }else{
          this.openSnackBar();
          this.router.navigate(['usuario/nuevo'])
        }
      })
  }

}
