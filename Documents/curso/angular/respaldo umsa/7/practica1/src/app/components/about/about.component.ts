import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    form:any;
    token:any;
    textoError:any[]=[]
    swError:any=''
    mensajeError:string=''
    usuario:any={
      correo:"",
      password:""
    }
  
    constructor( private servicio:ServiceService,
                  private router:Router) { }
  
    ngOnInit(): void {
    }
  
    login(form:NgForm){
      if(form.invalid){
        
        return ;
      }
      // this.servicio.login(form.form.value.email,form.form.value.password)
      this.router.navigate(['registrarse',form.form.value.dato])
    }
    registrarse(){
        this.router.navigate(['/registrarse']);
    }
    back(){
      window.history.back();
    }
}
