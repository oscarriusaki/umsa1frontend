import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

  usuario:any = {
    "nombre":"",
    "apellidoPaterno":"",
    "apellidoMaterno":"",
    "uid":"",
  }
  persona:any;
  loading:boolean=false;
  constructor(private servicio:ServiceService,
              private _snackBar: MatSnackBar,
              private router:Router) {
     this.servicio.obtenerUsuarioActual()
       .subscribe((resp:any) =>{
         this.persona=resp.usuario1
         this.usuario.nombre=this.persona.nombre;
         this.usuario.apellidoPaterno=this.persona.apellidoPaterno;
         this.usuario.apellidoMaterno=this.persona.apellidoMaterno;
         this.usuario.uid=this.persona.uid;
         this.loading=true
        })
  }
  ngOnInit(): void {
  }
  openSnackBar() {
    this._snackBar.open('Actualizado', '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  actualizar(dato:any){
    this.servicio.actualizarUsuario(this.persona.uid,dato.form.value.nombre,dato.form.value.apellidoPaterno,dato.form.value.apellidoMaterno)
      .subscribe(resp =>{
        this.openSnackBar()
        this.router.navigate(['usuario/perfil'])
        // window.location.reload();
        // this.back();
      })
  }
  back(){
    window.history.back();
    //this.router.navigate(['usuario/perfil'])
  }
}
