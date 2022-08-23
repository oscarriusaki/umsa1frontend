import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
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
  forma:any;
  // carga:boolean=true;

  constructor(private router:Router,
              private servicio:ServiceService,
              private activatedRoute:ActivatedRoute, 
              private fb:FormBuilder) { 
                this.activatedRoute.params.
                    subscribe(resp =>{
                      this.motivo=resp['id']
                    })
                    this.crearFormulario();
              }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/login'])  
    }
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
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get passwordNoValido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched;
  }
  get password2NoValido(){
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('password2').value;
    if(pass2.length>1){
      return (pass1 === pass2)? false:true
    }else{
      return false;
    }
    // return ((pass1 === pass2) || (pass2.length > 2)) ? false: true;
  }
  crearFormulario(){
    this.forma = this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(2)]], 
      apellidoPaterno:['', [Validators.required, Validators.minLength(0)]],
      apellidoMaterno:['', [Validators.required, Validators.minLength(0)]],
      correo:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',  [Validators.required, Validators.minLength(9)]],
      password2:['', [Validators.required, Validators.minLength(9)]]
    }, {
      validators: this.servicio.validarPassword('password','password2')
    })
  }
  registrar(form:NgForm){
    // this.carga = false;
    if(form.invalid){
      Object.values(this.forma.controls).forEach((control:any) => {
        control.markAsTouched();
      })
      return
    }
    this.servicio.registrarUsuario(form.value.nombre,form.value.apellidoPaterno,form.value.apellidoMaterno,form.value.correo,form.value.password,'USER_ROL',this.motivo)
        .subscribe(resp =>{
          // this.carga=true;
          window.location.reload()
        },(err) =>{
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
