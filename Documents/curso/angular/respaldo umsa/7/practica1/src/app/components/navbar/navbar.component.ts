import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  de:any=''
  publicacion:any=''
  validar:boolean=false;
  cargado:boolean=false;

  constructor(private servicio:ServiceService,
              private router:Router) { }

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
  buscar(f:NgForm){
    if(f.invalid){
      return ;
    }
    this.router.navigate(['usuario/buscar',f.form.value.busqueda])
  }
  perfil(){
    this.router.navigate(['usuario/perfil'])
  }
  modificarPerfil(){
    this.router.navigate(['usuario/modificarPerfil'])
  }
  salir(){
    window.location.reload();
    this.servicio.salir();
  }
  cargar(){
    this.router.navigate(['usuario/nuevo'])
  }
}
