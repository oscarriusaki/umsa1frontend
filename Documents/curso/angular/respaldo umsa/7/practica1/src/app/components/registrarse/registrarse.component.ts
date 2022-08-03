import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  usuario:any;
  form:any;
  swError:Boolean=false;
  mensajeError:string='';
  motivo:any;
  mensajeError2:any=''

  constructor(private router:Router,
              private servicio:ServiceService,
              private activatedRoute:ActivatedRoute) { 
                this.activatedRoute.params.
                    subscribe(resp =>{
                      this.motivo=resp['id']
                    })
              }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/login'])  
    }
  }

  registrar(form:NgForm){
    if(form.invalid){
      return
    }
    this.servicio.registrarUsuario(form.form.value.nombre,form.form.value.apellidoPaterno,form.form.value.apellidoMaterno,form.form.value.correo,form.form.value.password,'USER_ROL',this.motivo)
        .subscribe(resp =>{
          console.log(resp);
          
          window.location.reload()
        },(err) =>{
          // console.log(err.error.msg,'esete es el error');
          // console.log(err,'esete es el error');
          this.mensajeError2=err.error.msg
        })
    if(localStorage.getItem('token')){
      this.router.navigate(['/login'])  
    }
    
  }
  login(){
    this.router.navigate(['/login'])    
  }

}
