import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre:any;
  de:any;
  apellidoPaterno:any;
  apellidoMaterno:any;
  loading:any=false;
  fecha:any;
  cantidadPublicacion:any=0;
  cantidadLike:any;
  cantidadCompartido:any;
  publicaciones:any;
  compartidos:any;
  likesU:any;
  msg:any='';
  usuarioActualId:any='';
  cargarContenido:boolean=false;
  
  idBuscar:any='';
  cargarContenido1=false;
  cargarContenido2=false;
  cargarContenido3=false;

  constructor(private servicio:ServiceService,
              private router:Router,
              private _snackBar:MatSnackBar) { 
                this.publicaciones=0;
              }

  ngOnInit(): void {
    this.mostrarUsuario();
  
  }
  openSnackBar2(dato:any) {
    let mensaje='Compartido'
    if(dato){
      mensaje='Publicacion no compartido'
    }
    this._snackBar.open(mensaje, '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  openSnackBar3(dato:any) {
    let mensaje='Reportado'
    if(dato){
      mensaje='Publicacion no reportado'
    }

    this._snackBar.open(mensaje, '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  openSnackBar4( ) {
    let mensaje='Eliminado'
    this._snackBar.open(mensaje, '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  mostrarUsuario(){

    this.servicio.obtenerUsuarioActual()
        .subscribe((resp:any )=>{
          if(resp.msg === 'expiro'){
            localStorage.clear();
            window.location.reload();
            this.cargarContenido=false;
          }else{
            this.nombre=resp.usuario1.nombre;
            this.de=resp.usuario1.nombre.toUpperCase().charAt(0);
            this.apellidoPaterno=resp.usuario1.apellidoPaterno;
            this.apellidoMaterno=resp.usuario1.apellidoMaterno;
            this.loading=resp.usuario1.loading;
            this.fecha=resp.usuario1.fecha;
            this.cargarContenido=true;
          }
        })
    this.buscarLikeUsuarioX();
    this.buscarCompartidosUsuarioX();
    this.publicacionesUsuarioX();
    this.usuarioActual(); 
  }
  publicacionesUsuarioX(){
    this.servicio.publicacionesUsuarioX()
        .subscribe((resp:any) =>{
          this.cantidadPublicacion=resp.count;
          this.msg=resp.msg
          this.publicaciones=resp.objAux2
          this.cargarContenido1=true;
        })
  }

  buscarLikeUsuarioX(){
    this.servicio.buscarLikeUsuarioX()
        .subscribe((resp:any) =>{
          this.cantidadLike=resp.count2;
          this.likesU=resp.axumostrar;
          this.cargarContenido2=true;
        })
  }

  buscarCompartidosUsuarioX(){
    this.servicio.buscarCompartidosUsuarioX()
        .subscribe((resp:any) =>{
          this.cantidadCompartido=resp.count2;
          this.compartidos=resp.contenido;
          this.cargarContenido3=true;
        })
  }

  like(dato:any){
    this.servicio.likePublicacion(dato.uid)
    .subscribe(resp =>{
    this.buscarLikeUsuarioX();
     this.buscarCompartidosUsuarioX();
     this.publicacionesUsuarioX();
    });
  }
  compartir(dato:any){
    this.servicio.compartirPublicacion(dato.uid)
      .subscribe(resp =>{
      this.buscarLikeUsuarioX();
     this.buscarCompartidosUsuarioX();
     this.publicacionesUsuarioX();
     this.openSnackBar2(dato.compartir)
      })
  }
  editarPerfil(){
    this.router.navigate(['usuario/modificarPerfil'])
  }
  comentar(data:any){
    this.router.navigate(['usuario/comentario',data.uid])
  }
  reportar(dato:any){
    this.servicio.reportarPublicacion(dato.uid)
        .subscribe(resp =>{
          this.buscarLikeUsuarioX();
          this.buscarCompartidosUsuarioX();
          this.publicacionesUsuarioX();
          this.openSnackBar3(dato.reportar)
        })
  }
  editarPublicacion(dato:any){
      this.router.navigate(['usuario/editarPublicacion',dato.uid])
  }
  borrar(dato:any){
    this.servicio.eliminarPublicar(dato.uid)
      .subscribe(resp =>{
        // console.log(resp,'eliminado');
        this.buscarLikeUsuarioX();
          this.buscarCompartidosUsuarioX();
          this.publicacionesUsuarioX();
          this.openSnackBar4();
          // window.location.reload();
      })
  }
  usuarioActual(){
    this.servicio.usuarioActual()
      .subscribe((resp:any) =>{
        this.idBuscar=resp.usuario1.uid;
        console.log(this.usuarioActual)
      })
  }
  buscarusuario(usuario:any){
    this.router.navigate(['usuario/perfilAuxiliar',usuario._id+'']);
  }
}
