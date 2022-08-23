import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  form:any;
  token:any;
  textoError:any[]=[]
  swError:any=''
  mensajeError:string=''
  erroe1:any='';
  erroe2:any='';
  usuario:any={
    correo:"",
    password:""
  }

  forma:any;
  desabilitar:boolean = false;

  constructor(private servicio:ServiceService,
              private router:Router,
              private fb:FormBuilder) { 
                this.crearFormulario();
              }

  ngOnInit(): void {
  }
  val(){
    this.desabilitar = false;
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched && this.forma.get('correo').value.length>7;
  }
  get passwordNoValido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched && this.forma.get('password').value.length>3;
  }

  crearFormulario(){
      this.forma = this.fb.group({
        correo:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      })
  }
  login(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach((control:any) => {
        control.markAsTouched();
      })
      return 
    }
    this.servicio.login(this.forma.value.correo,this.forma.value.password)
        .subscribe((resp:any) =>{
           this.router.navigate(['usuario','nuevo']) 
           this.desabilitar=true;
        },(err) => {
          this.mensajeError = err.error.msg;
          this.desabilitar = true;
        })
  }
  registrarse(){
    this.router.navigate(['about']);
  }
  refresh(): void {
  }
  borrarCampo(){
    this.erroe1=''
    this.erroe2=''
  }
}
