import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.css']
})
export class EditarPublicacionComponent implements OnInit {

  parametro:any
  publicacion:any={
    descripcion:'',
    contenido:'',
    tipoEnfermedad:'',
  }
  cargar:boolean = false;

  enfermedades:any=[
    'Alergia',
    'Ántrax',
    'Asma',
    'Autismo',
    'Artritis',
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

  constructor(private router:Router,
              private activateRoute:ActivatedRoute,
              private servicio:ServiceService,
              private _snackBar:MatSnackBar  ) {
                this.activateRoute.params
                    .subscribe(resp =>{
                      this.parametro=resp['id']
                    })
                    this.servicio.mostrarPublicacionX(this.parametro)
                      .subscribe((resp :any)=>{
                        this.publicacion.descripcion=resp.usuario.descripcion.substring(0,1)+resp.usuario.descripcion.substring(1).toLowerCase();;
                        this.publicacion.contenido=resp.usuario.contenido.substring(0,1)+resp.usuario.contenido.substring(1).toLowerCase();;
                        this.publicacion.tipoEnfermedad=resp.usuario.tipoEnfermedad.substring(0,1)+resp.usuario.tipoEnfermedad.substring(1).toLowerCase();
                        this.cargar = true;
                      })
               }
  ngOnInit(): void {
  }
  openSnackBar() {
    this._snackBar.open('Publicacion Modificada', '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  enviar(f:NgForm){
    if(f.invalid){
      return ;
    }
    this.servicio.modificarPublicar(this.parametro,f.form.value.descripcion,f.form.value.contenido,this.enfermedades[f.form.value.tipoEnfermedad])
      .subscribe(resp =>{
        this.openSnackBar();
        this.back();
      }) 
  }
  back(){
    window.history.back();
  }
}
