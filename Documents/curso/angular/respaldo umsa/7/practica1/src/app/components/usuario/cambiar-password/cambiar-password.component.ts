import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  loading:boolean=false;
  forma:any;
  p1:any='';
  p2:any='';
  p3:any='';
  tipo:boolean=false;
  tipo2:boolean=false;
  mensaje:string='';

  constructor(private activatedRoute:ActivatedRoute,
              private fb:FormBuilder,
              private servicio:ServiceService,
              private _snackBar:MatSnackBar,
              private router:Router) {
    this.generarFormulario();
    this.activatedRoute.params.subscribe(resp => {
      console.log(resp);
    })
  }
  ngOnInit(): void {
  }
  get passwordNoValido(){
    return this.forma.get('password1').invalid && this.forma.get('password1').touched;
  }
  get password2NoValido(){
    return this.forma.get('password2').invalid && this.forma.get('password2').touched;
  }
  get password3NoValido(){
    const pass1 = this.forma.get('password2').value;
    const pass2 = this.forma.get('password3').value;
    return (pass1 === pass2)? false: true;
  }
  openSnackBar() {
    this._snackBar.open('Actualizado', '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  generarFormulario(){
    this.forma = this.fb.group({
      password1: ['', [Validators.required, Validators.minLength(9)]],
      password2: ['', [Validators.required, Validators.minLength(9)]],
      password3: ['', [Validators.required, Validators.minLength(9)]]
    },{
      validators: this.servicio.validarPassword('password2','password3')
    })
  }
  actualizar(){
    console.log(this.forma)
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach((control:any) => {
        control.markAsTouched();
      })
      return;
    }
    this.servicio.actualizarPassword(this.forma.value.password1, this.forma.value.password2)
      .subscribe((resp:any) =>{
        console.log(resp)
        if(resp.msg){
          this.mensaje = resp.msg;
        }else{
          this.openSnackBar()
          this.router.navigate(['usuario/perfil'])
        }
      })
  }
  back(){
    window.history.back();
    //this.router.navigate(['usuario/perfil'])
  }
  mostrarPassword(){
    this.tipo=!this.tipo;
  }
  mostrarPassword2(){
    this.tipo2=!this.tipo2;
  }
}
