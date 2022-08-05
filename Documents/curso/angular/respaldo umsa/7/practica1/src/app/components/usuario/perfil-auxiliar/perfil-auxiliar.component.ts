import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil-auxiliar',
  templateUrl: './perfil-auxiliar.component.html',
  styleUrls: ['./perfil-auxiliar.component.css']
})
export class PerfilAuxiliarComponent implements OnInit {
 
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
  idBuscar:any ='';
  usuarioActual11:any='';
  usuarioActual33:any='';
  
  cargarContenido1=false;
  cargarContenido2=false;
  cargarContenido3=false;

  constructor(private servicio:ServiceService,
              private router:Router,
              private _snackBar:MatSnackBar,
              private activatedRoute:ActivatedRoute) { 
                this.publicaciones=0;
                this.activatedRoute.params
                    .subscribe(resp =>{
                      console.log(resp)
                      this.idBuscar=resp['id'];
                      console.log(this.idBuscar,'idBuscar')
                    })
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
    this.servicio.obtenerUsuarioActual1(this.idBuscar)
        .subscribe((resp:any )=>{
          if(resp.msg === 'expiro'){
            localStorage.clear();
            window.location.reload();
            this.cargarContenido=false;
          }else{
            this.nombre=resp.usuarioExiste.nombre;
            this.de=resp.usuarioExiste.nombre.toUpperCase().charAt(0);
            this.apellidoPaterno=resp.usuarioExiste.apellidoPaterno;
            this.apellidoMaterno=resp.usuarioExiste.apellidoMaterno;
            this.loading=resp.usuarioExiste.loading;
            this.fecha=resp.usuarioExiste.fecha;
            this.cargarContenido=true;
          }
        })
    this.buscarLikeUsuarioX(  this.idBuscar);
    this.buscarCompartidosUsuarioX(  this.idBuscar);
    this.publicacionesUsuarioX(  this.idBuscar);
    this.usuarioActual(  this.idBuscar); 
    this.usuarioActual2( ); 
  }
  buscarLikeUsuarioX(id:any){
    this.servicio.buscarLikeUsuarioX1(id)
        .subscribe((resp:any) =>{
          this.cantidadLike=resp.count2;
          this.likesU=resp.axumostrar;
          this.cargarContenido2=true;
        })
  }
  buscarCompartidosUsuarioX(id:any){
    this.servicio.buscarCompartidosUsuarioX1(id)
        .subscribe((resp:any) =>{
          this.cantidadCompartido=resp.count2;
          this.compartidos=resp.contenido;
          this.cargarContenido3=true;
        })
  }
  publicacionesUsuarioX(id:any){
    this.servicio.publicacionesUsuarioX1(id)
        .subscribe((resp:any) =>{
          this.cantidadPublicacion=resp.count;
          this.msg=resp.msg
          this.publicaciones=resp.objAux2
          this.cargarContenido1=true;
        } )
  }
  like(dato:any){
    this.servicio.likePublicacion(dato.uid)
    .subscribe(resp =>{
    this.buscarLikeUsuarioX(  this.idBuscar);
     this.buscarCompartidosUsuarioX(  this.idBuscar);
     this.publicacionesUsuarioX(  this.idBuscar);
    });
  }
  compartir(dato:any){
    this.servicio.compartirPublicacion(dato.uid)
      .subscribe(resp =>{
    this.buscarLikeUsuarioX(  this.idBuscar);
    this.buscarCompartidosUsuarioX(  this.idBuscar);
    this.publicacionesUsuarioX(  this.idBuscar);
    this.openSnackBar2(dato.compartir)
      })
  }
  editarPerfil(){
    // this.servicio
    this.router.navigate(['usuario/modificarPerfil'])
  }
  comentar(data:any){
    this.router.navigate(['usuario/comentario',data.uid])
  }
  reportar(dato:any){
    this.servicio.reportarPublicacion(dato.uid)
        .subscribe(resp =>{
          this.buscarLikeUsuarioX(  this.idBuscar);
          this.buscarCompartidosUsuarioX(  this.idBuscar);
          this.publicacionesUsuarioX(  this.idBuscar);
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
        this.buscarLikeUsuarioX(  this.idBuscar);
          this.buscarCompartidosUsuarioX(  this.idBuscar);
          this.publicacionesUsuarioX(  this.idBuscar);
          this.openSnackBar4();
          // window.location.reload();
      })
  }
  usuarioActual(id:any){
    this.servicio.obtenerUsuarioActual1(id)
      .subscribe((resp:any) =>{
        this.usuarioActual33=resp.usuarioExiste.uid;
        console.log(resp);
      })
  }
  usuarioActual2(){
    this.servicio.obtenerUsuarioActual()
      .subscribe((resp:any) =>{
        this.usuarioActual11=resp.usuario1.uid;
        console.log(resp);
      })
  }
  buscarusuario(usuario:any){
    this.router.navigate(['usuario/perfilAuxiliar',usuario._id+'']);
      this.servicio.obtenerUsuarioActual1(usuario._id)
          .subscribe((resp:any )=>{
            if(resp.msg === 'expiro'){
              localStorage.clear();
              window.location.reload();
              this.cargarContenido=false;
              // this.idBuscar=usuario._id;
            }else{
              this.nombre=resp.usuarioExiste.nombre;
              this.de=resp.usuarioExiste.nombre.toUpperCase().charAt(0);
              this.apellidoPaterno=resp.usuarioExiste.apellidoPaterno;
              this.apellidoMaterno=resp.usuarioExiste.apellidoMaterno;
              this.loading=resp.usuarioExiste.loading;
              this.fecha=resp.usuarioExiste.fecha;
              this.cargarContenido=true;
              this.buscarLikeUsuarioX(  this.idBuscar);
              this.buscarCompartidosUsuarioX(  this.idBuscar);
              this.publicacionesUsuarioX(  this.idBuscar);
              this.usuarioActual(  this.idBuscar); 
              this.usuarioActual2( ); 
            }
          })
  }
  nuevobuscar(id:any){
    this.idBuscar = id;
    this.mostrarUsuario();
  }
  back(){
    window.history.back();
  }
}
