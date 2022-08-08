import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  publicaciones:any;
  parametro:any='';
  contador:any=0;
  idBuscar:any='';
  cargar:boolean=false;
 

  constructor(private servicio:ServiceService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private _snackBar:MatSnackBar) { 
    this.mostrar()
  }  
  ngOnInit(): void {
  }
  mostrar(){
      this.activatedRoute.params  
        .subscribe((resp:any) =>{
          this.parametro=resp['id']
          this.servicio.buscarPublicacionParametroX(this.parametro)
              .subscribe((resp:any) =>{
                if(resp.msg === 'expiro'){
                  localStorage.clear();
                  window.location.reload();
                }
                this.publicaciones=resp.objAux3
                this.contador=resp.contadorAuxiliar
                this.usuarioActual();
                this.cargar = true;
          
              })
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

  like(dato:any){
    this.servicio.likePublicacion(dato.uid)
    .subscribe(resp =>{
      // console.log(resp);
      this.mostrar();
    });
  }
  compartir(dato:any){
    this.servicio.compartirPublicacion(dato.uid)
      .subscribe(resp =>{
        this.openSnackBar2(dato.compartir)
        this.mostrar();
      })
  }
  reportar(dato:any){
    this.servicio.reportarPublicacion(dato.uid)
        .subscribe(resp =>{
          this.mostrar()
          this.openSnackBar3(dato.reportar)
        })
  }
  comentar(data:any){
    this.router.navigate(['usuario/comentario',data.uid])
  }
  back(){
    window.history.back();
  }
  editarPublicacion(dato:any){
    this.router.navigate(['usuario/editarPublicacion',dato.uid])
  }
  borrar(dato:any){
    this.servicio.eliminarPublicar(dato.uid)
      .subscribe((resp:any) =>{
        
        if(resp.msg === 'expiro'){
          localStorage.clear();
          window.location.reload();
        }
        // console.log(resp,'eliminado');
        this.mostrar();
          // window.location.reload();
      })
  }
  usuarioActual(){
    this.servicio.usuarioActual()
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          window.location.reload();
        }
        this.idBuscar = resp.usuario1.uid;
      })
  }
  buscarusuario(usuario:any){
    this.router.navigate(['usuario/perfilAuxiliar',usuario._id+'']);
  }
}
