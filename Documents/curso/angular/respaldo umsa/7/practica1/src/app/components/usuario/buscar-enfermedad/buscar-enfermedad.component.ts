import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buscar-enfermedad',
  templateUrl: './buscar-enfermedad.component.html',
  styleUrls: ['./buscar-enfermedad.component.css']
})
export class BuscarEnfermedadComponent implements OnInit {

  publicaciones:any;
  parametro:any;
  idBuscar:any='';
  cargar:boolean = false;

  constructor(private activatedRouter:ActivatedRoute,
              private servicio:ServiceService,
              private router:Router,
              private _snackBar:MatSnackBar) {
      this.mostrar();
    }
    
  mostrar(){
    this.cargar = false;
    this.activatedRouter.params
      .subscribe(resp =>{
        console.log('hola mundo')
        this.parametro=resp['id'];
        this.buscarEnfermedadX(this.parametro);
        this.usuarioActual();
        this.cargar = true;
    })
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
  ngOnInit(): void {
   /*  if(!localStorage.getItem('token')){
      this.router.navigate(['login'])
    }  */
  }
  like(dato:any){
    this.servicio.likePublicacion(dato.uid)
    .subscribe(resp =>{
      this.buscarEnfermedadX(this.parametro)
    });
  }
  compartir(dato:any){
    this.servicio.compartirPublicacion(dato.uid)
      .subscribe(resp =>{
        this.buscarEnfermedadX(this.parametro)
        this.openSnackBar2(dato.compartir)
      })
  }
  buscarEnfermedadX(id:any){
    this.servicio.buscarEnfermedadX(id)
        .subscribe((resp:any) =>{
          console.log(resp)
          this.publicaciones = resp.objAux3;
        })
  }
  comentar(data:any){
    this.router.navigate(['usuario/comentario',data.uid])
  }
  reportar(dato:any){
    this.servicio.reportarPublicacion(dato.uid)
        .subscribe(resp =>{
          this.mostrar()
          this.openSnackBar3(dato.reportar)
        })
  }
  back(){
    window.history.back();
  }
  editarPublicacion(dato:any){
    this.router.navigate(['usuario/editarPublicacion',dato.uid])
  }
  borrar(dato:any){
    this.servicio.eliminarPublicar(dato.uid)
      .subscribe(resp =>{
        // console.log(resp,'eliminado');
        this.mostrar();
          // window.location.reload();
      })
  }
  usuarioActual(){
    this.servicio.usuarioActual()
      .subscribe((resp:any) =>{
        console.log(resp)
        this.idBuscar = resp.usuario1.uid;
        console.log(this.idBuscar)
      })
  }
  buscarusuario(usuario:any){
    this.router.navigate(['usuario/perfilAuxiliar',usuario._id+'']);
  }
}
