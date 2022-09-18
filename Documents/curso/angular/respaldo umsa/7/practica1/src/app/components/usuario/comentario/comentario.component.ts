import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {


  loading:any=false;
  loading2:any=false;

  nombre:any='';
  apellidoPaterno:any;
  apellidoMaterno:any;
  fecha:any;
  tipoEnfermedad:any;
  descripcion:any;
  cantidadLikes:any;
  cantidadComentarios:any;
  cantidadCompartidos:any;
  usuarioActualNombre:any='';
  contenido2:any
  cargarContenido:boolean=false;
  id:any
  publicacion:any;
  aux:any=false;
  comentariosPublicacionX:any
  likee:any;
  compartirr:any
  usuario:any={
    contenido:""
  }
  idLogueado:any;
  editarF:number=-1;
  contenidoComentario:string='';
  cargar:boolean=true;
  forma:any

  constructor(private servicio:ServiceService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private _snackBar:MatSnackBar,
              private formBuilder:FormBuilder) {
                this.servicio.validarToken()
                .subscribe((resp:any) => {
                  if(resp.msg === 'expiro'){
                      this.router.navigate(['usuario']);
                  }
                })
    this.activatedRoute.params
        .subscribe((resp:any )=>{
          this.id=resp.id
        })
     this.mostrarPublicacion();
     this.mostrarComentarios();
     this.inicializar();
  }

  ngOnInit(): void {

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
      mensaje='Comentario no reportado'
    }

    this._snackBar.open(mensaje, '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  openSnackBar4(dato:any) {
    let mensaje='Reportado'
    if(dato){
      mensaje='Publicacion no Reportado'
    }

    this._snackBar.open(mensaje, '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
  }
  mostrarPublicacion(){
    this.servicio.mostrarUnaPublicacionAvanzada(this.id)
    .subscribe((resp:any) =>{
      this.publicacion=resp.auxObj
      this.nombre=this.publicacion.usuario.nombre;
      this.apellidoPaterno=this.publicacion.usuario.apellidoPaterno;
      this.apellidoMaterno=this.publicacion.usuario.apellidoMaterno;
      this.fecha=this.publicacion.fecha;
      this.tipoEnfermedad=this.publicacion.tipoEnfermedad;
      this.descripcion=this.publicacion.descripcion;
      this.cantidadLikes=this.publicacion.CantidadLikes;
      this.cantidadComentarios=this.publicacion.CantidadComentarios;
      this.cantidadCompartidos=this.publicacion.CantidadCompartidos;
      this.contenido2=this.publicacion.contenido;
      this.likee=this.publicacion.like;
      this.compartirr=this.publicacion.compartir;
      this.cargar=false;
      this.loading=true;
      this.cargarContenido = true;
    })
    this.servicio.obtenerUsuarioActual()
        .subscribe((resp:any) =>{
          this.usuarioActualNombre=resp.usuario1.nombre
        })
  }
  mostrarComentarios(){
    this.servicio.mostrarComentarioPublicacionX(this.id)
        .subscribe((resp:any) =>{
          if(resp.msg === 'expiro'){
            localStorage.clear();
            window.location.reload();
            this.loading2=false;
          }else{
            this.comentariosPublicacionX=resp.arr
            this.loading2=true
            this.idLogueado=resp.idLogueado;
            this.editarF =-1;
          }
        })
  }
  atras(){
    // this.router.navigate(['home']);
    window.history.back();
  }
  likePublicacion(dato:any){
    this.servicio.likePublicacion(dato.uid)
    .subscribe(resp =>{
      this.mostrarPublicacion();
    });
  }
  compartir(dato:any){
    this.servicio.compartirPublicacion(dato.uid)
      .subscribe(resp =>{
        this.mostrarPublicacion();
        this.openSnackBar2(dato.compartir);
      })
  }
 

  crearComentario(dato:NgForm){
    if(dato.invalid){
        return;
    }
    this.servicio.comentarUnaPublicacion(this.id, dato.form.value.contenido)
        .subscribe(resp=>{
          this.mostrarComentarios()
          this.mostrarPublicacion();
          dato.reset();
        })
  }
  likeComentario(dato:any){
    this.servicio.likeComentario(dato.uid)
      .subscribe(resp =>{
        this.mostrarComentarios();
      })
  }
  mensaje(d:any){
    console.log('holaa',d)
  }
  reportar(comentario:any){
    this.servicio.reportarComentario(comentario.uid)
      .subscribe(resp =>{
        this.mostrarComentarios();
        this.mostrarPublicacion();
      });
    this.openSnackBar4(comentario.reportar)
    
  }
  editarComentario(u:any){
    this.editarF =u.uid;
    this.contenidoComentario=u.contenido.toLowerCase()
    this.forma.reset({
      con:this.contenidoComentario
    })
  }
  modificarComentario(u:any){
    this.servicio.modificarComentario(this.forma.controls.con.value, u.uid, this.publicacion.uid)
        .subscribe(resp =>{
          this.mostrarComentarios();
          
        });
  }
  cancelar(){
    this.editarF =-1;
  }
  inicializar(){
    this.forma=this.formBuilder.group({
      con:['',[Validators.required, Validators.minLength(1)]]
    })
  }
  eliminarComentario(co:any){
    this.servicio.eliminarComentario(co.uid)
      .subscribe(resp =>{
          this.mostrarComentarios();
          this.mostrarPublicacion();
      })
  }
  back(){
    window.history.back();
  }
  buscarusuario(usuario:any){
    this.router.navigate(['usuario/perfilAuxiliar',usuario._id+'']);
  }

}
