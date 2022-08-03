import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, NgForm, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent implements OnInit {

  loading:boolean=false;
  publicaciones:any;
  data:any={
    nombre:'Seleccione una opcion'
  }
  enfermedades:any=[
    'Tos',
    'Cancer de colon',
    'Diabetes',
    'Cancer de mama',
    'Cancer de piel',
    'Resfrio',
    'Sinusitis',
    'Gonorea',
    'Senfalitis',
    'Meningitis',
  ]
  actual:any='M'
  sw:boolean=true;
  de:any;
  index:any=0;
  cantidad:any=0;
  idBuscar:any='';
  swVerificar:boolean = false;
  form:any;

  @Output() ato:EventEmitter<any>=new EventEmitter();
  constructor(private servicio:ServiceService, 
              private _snackBar:MatSnackBar,
              private router:Router,
              private fb:FormBuilder) { }
  ngOnInit(): void {
    this.servicio.obtenerUsuarioActual()
      .subscribe((resp:any) =>{
        this.de=resp.usuario1.nombre.toUpperCase().charAt(0);
      })
    this.mostrar();
    // this.usuarioActual();
  }
  openSnackBar() {
    this._snackBar.open('Publicado', '',{  
      horizontalPosition:'start',
      verticalPosition:'bottom',
      duration: 2 * 1000,
    });
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
    this.servicio.getPublicaciones()
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          this.loading=false;
          window.location.reload();
        }else{
          this.publicaciones = resp.objAux;
          console.log(this.publicaciones)
          this.loading=true;
          this.cantidad=resp.count;
          this.idBuscar='';
          this.usuarioActual();
          // this.sw=true;
        }
      },(err) => {
        this.loading=false;
      })
  }
  actualizar(q:any){
    this.mostrar();
  }
  verifica(i:NgForm){
    console.log(i)
 /*    this.form = this.fb.group({
      i: ['',Validators.required, Validators.minLength(1)]
    }) */
    // console.log(i);
    // this.form.get(i).valueChanges.subscribe(console.log);
   
  }
  envia(f:NgForm){
    if((f.form.value.descripcion === '') || 
    (f.form.value.contenido === '') || 
    (f.form.value.tipoEnfermedad === "Seleccione una opcion")){
      return ;
  }
  console.log(f.form.value.tipoEnfermedad)
  
  if(f.invalid){
    return ;
  }
    this.loading=false;
    this.servicio.publicar(f.form.value.descripcion,f.form.value.contenido,this.enfermedades[f.form.value.tipoEnfermedad])
      .subscribe(resp =>{
        this.openSnackBar();
        // this.loading=true;  
        this.mostrar()
        //  console.log(f,'Formulario')
        //  f.form.controls.descripcion.value('hola')
        f.reset({
          tipoEnfermedad:this.data
        })
      })
  }
  like(dato:any){
    this.servicio.likePublicacion(dato.uid)
    .subscribe(resp =>{

      this.mostrar();
    });
  }
  compartir(dato:any){
    this.servicio.compartirPublicacion(dato.uid)
      .subscribe(resp =>{
        this.mostrar();
        this.openSnackBar2(dato.compartir);
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
  usuarioActual(){
    this.servicio.usuarioActual()
      .subscribe((resp:any) =>{
        this.idBuscar = resp.usuario1.uid;
        console.log(this.idBuscar)
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
  buscarusuario(usuario:any){
    this.router.navigate(['usuario/perfilAuxiliar',usuario._id+'']);
  }
  crearComentario(dato:NgForm,idd:String){
      if(dato.invalid){
          return;
      }
      console.log(dato)
      this.servicio.comentarUnaPublicacion(idd, dato.form.value.termino)
          .subscribe(resp=>{
            console.log(resp)
            this.mostrar()
            dato.reset();
          })
  }
}
