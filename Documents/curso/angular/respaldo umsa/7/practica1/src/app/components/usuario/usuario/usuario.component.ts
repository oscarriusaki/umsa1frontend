import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  title = 'proyeto2';
  publicaciones:any
  enfermeades:any
  sw:any=false;
  de:any=''
  publicacion:any=''
  validar:boolean=false;
  cargado:boolean=false;

  constructor(private servicio:ServiceService,
              private router:Router){
    this.contarEnfermeades(); 
  }
  ngOnInit(): void {
    this.servicio.obtenerUsuarioActual()
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          window.location.reload();
          this.cargado=false;
        }else{
          this.publicacion=resp
          this.de=resp.usuario1.nombre.toUpperCase().charAt(0);
          this.cargado=true;
        }
      })
  }
  contarEnfermeades(){
    this.servicio.contarEnfermedades()
        .subscribe((resp:any) =>{
          this.enfermeades=resp.data;
        })
  }
  buscarEnfermedad(dato:any){
    this.router.navigate(['usuario/buscarEnfermedad',dato._id])
  }
  login(){
    this.router.navigate(['login'])
  }
  registrarse(){
    this.router.navigate(['about'])
  }
  principal(){
    this.router.navigate(['principal'])

  }
  cargar(){
    this.router.navigate(['usuario/nuevo'])
  }
  buscar(f:NgForm){
    if(f.invalid){
      return ;
    }
    this.router.navigate(['buscar',f.form.value.busqueda])
  }
  perfil(){
    this.router.navigate(['perfil'])
  }
  modificarPerfil(){
    this.router.navigate(['modificarPerfil'])
  }
  salir(){
    window.location.reload();
    this.servicio.salir();
  }
}
