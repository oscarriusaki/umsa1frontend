import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

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
    "uid":""
  }
  persona:any;
  loading:boolean = false;
  forma:any;
  tipo:any = false;
  tipo2:any = false;

  constructor(private servicio:ServiceService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private fb:FormBuilder) {
    this.servicio.validarToken()
    .subscribe((resp:any) => {
      if(resp.msg === 'expiro'){
          this.router.navigate(['usuario']);
      }
    })
    this.crearFormulario();
    this.servicio.obtenerUsuarioActual()
       .subscribe((resp:any) =>{
        console.log(resp,'dataaa')
         this.persona=resp.usuario1;
         this.usuario.nombre=this.persona.nombre;
         this.usuario.apellidoPaterno=this.persona.apellidoPaterno;
         this.usuario.apellidoMaterno=this.persona.apellidoMaterno;
         this.usuario.uid=this.persona.uid;
         this.loading=true;
         this.inicializarValores();
        })
  }
  ngOnInit(): void {
  }
  inicializarValores(){
    this.forma.reset({
      nombre: this.usuario.nombre,
      apellidoPaterno: this.usuario.apellidoPaterno,
      apellidoMaterno: this.usuario.apellidoMaterno,
    })
  }
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoPaternoNoValido(){
    return this.forma.get('apellidoPaterno').invalid && this.forma.get('apellidoPaterno').touched;
  }
  get apellidoMaternoNoValido(){
    return this.forma.get('apellidoMaterno').invalid && this.forma.get('apellidoMaterno').touched;
  }
 
  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [ Validators.required, Validators.minLength(2) ]],
      apellidoPaterno: ['', [ Validators.required, Validators.minLength(2) ]],
      apellidoMaterno: ['', [ Validators.required, Validators.minLength(2) ]],
    })
  }

  openSnackBar() {
    this._snackBar.open('Actualizado', '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  mostrarPassword(){
    this.tipo=!this.tipo;
  }
  mostrarPassword2(){
    this.tipo2=!this.tipo2;
  }
  actualizar(){
    console.log(this.forma)
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach((control:any) => {
        control.markAsTouched();
      })
      return ;
    }
    this.servicio.actualizarUsuario(this.persona.uid,this.forma.value.nombre,this.forma.value.apellidoPaterno,this.forma.value.apellidoMaterno)
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
