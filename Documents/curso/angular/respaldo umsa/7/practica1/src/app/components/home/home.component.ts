import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private servicio:ServiceService,
              private router:Router) { }

  ngOnInit(): void {
  }

  login(form:NgForm){
    if(form.invalid){
      return 
    }
    this.servicio.login(form.form.value.email,form.form.value.password)
        .subscribe((resp:any) =>{
          console.log(resp,'suscrito');
           this.router.navigate(['usuario','nuevo']) 
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
