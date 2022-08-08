import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {


  publicaciones:any;
  loading:any=false;
  cantidad:any=0;
  idBuscar:any='';

  constructor(private servicio:ServiceService,
              private router:Router,
              private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.mostrar();
    this.usuarioActual();
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
  mostrar(){
    this.servicio.buscarLikeUsuarioX()
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          window.location.reload();
          this.loading=false;
        }else{
          this.publicaciones=resp.axumostrar;
          this.loading=true;
          this.cantidad=resp.count2;
          this.usuarioActual();
        }
      })
  }
  like(dato:any){
    this.servicio.likePublicacion(dato.uid)
    .subscribe(resp =>{
      this.mostrar()
    });
  }
  compartir(dato:any){
    this.servicio.compartirPublicacion(dato.uid)
      .subscribe(resp =>{
        this.mostrar()
        this.openSnackBar2(dato.compartir);
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
  editarPublicacion(dato:any){
      this.router.navigate(['usuario/editarPublicacion',dato.uid])
  }
  borrar(dato:any){
    this.servicio.eliminarPublicar(dato.uid)
      .subscribe(resp =>{
        this.mostrar();
      })
  }
  usuarioActual(){
    this.servicio.usuarioActual()
      .subscribe((resp:any) =>{
        this.idBuscar = resp.usuario1.uid;
        console.log(this.idBuscar)
      })
  }
  buscarusuario(usuario:any){
    this.router.navigate(['usuario/perfilAuxiliar',usuario._id+'']);
  }
}
