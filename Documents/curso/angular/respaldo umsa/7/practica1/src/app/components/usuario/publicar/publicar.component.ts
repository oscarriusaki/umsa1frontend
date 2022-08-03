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
    'Tos',
    'Cancer de colon',
    'Diabetes',
    'Cancer de mama',
    'Cancer de piel',
    'Resfrio',
    'Sinusitis',
    'Gonorea',
    'Senfalitis',
    'Meningitis',
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
      (f.form.value.tipoEnfermedad === "Seleccione una opcion")){
        return ;
    }
    console.log(f.form.value.tipoEnfermedad)
    
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
