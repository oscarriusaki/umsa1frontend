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
    'Alergia',
    'Ántrax',
    'Asma',
    'Autismo',
    'Artritis',
    'Anemia',
    'Cáncer',
    'Clamidia',
    'Culebrilla (herpes zóster)',
    'Déficit de atención e hiperactividad',
    'Diabetes',
    'Ébola',
    'Embarazo y ETS',
    'Enfermedades de transmisión sexual (ETS)',
    'Enfermedad inflamatoria pélvica (EIP)',
    'Enfermedad pulmonar obstructiva crónica',
    'Epilepsia',
    'Escarlatina',
    'Estreptococo del grupo B',
    'Gonorrhea',
    'Haemophilus influenzae tipo b (Hib)',
    'Hemofilia',
    'Herpes genital',
    'Infeccíon genital por VPH',
    'Influenza (gripe)',
    'La Salud Mental de los Niños (Children’s Mental Health)',
    'Listeria (Listeriosis)',
    'Meningitis',
    'Neumonía',
    'Paperas',
    'Poliomielitis',
    'Rabia',
    'Reumatismo',
    'Rotavirus',
    'Shigella – Shigellosis',
    'Sífilis',
    'Silicosis',
    'Síndrome alcohólico fetal',
    'Síndrome de fatiga crónica (SFC)',
    'Síndrome de Tourette',
    'Tabaquismo',
    'Tosferina',
    'Tricomoniasis',
    'Tuberculosis (TB)',
    'Vaginosis bacteriana',
    'VIH/Sida',
    'Zika',
    '#otro',
              ]
  actual:any='M'
  sw:boolean=true;
  de:any;
  index:any=0;
  cantidad:any=0;
  idBuscar:any='';
  swVerificar:boolean = false;
  form:any;
  enfermeades:any;
  contadorGeneral:any;
  contadorData:any=[];
  salto:any=1;

  constructor(private servicio:ServiceService, 
              private _snackBar:MatSnackBar,
              private router:Router,
              private fb:FormBuilder) { }
              
  ngOnInit(): void {
    this.servicio.validarToken()
    .subscribe((resp:any) => {
      if(resp.msg === 'expiro'){
          this.router.navigate(['usuario']);
      }
    })
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
    if(localStorage.getItem('paginacion')){
      this.salto = Number(localStorage.getItem('paginacion'));
    }else{
      this.salto = 1;
    }
    this.servicio.getPublicaciones(this.salto)
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          this.loading=false;
          window.location.reload();
        }else{
          this.publicaciones = resp.objAux;
          this.loading=true;
          this.cantidad=resp.count;
          this.idBuscar='';
          this.usuarioActual();
          this.contadorGeneral = resp.countTotal;
        }
        for(let i = 0; i<=(this.contadorGeneral/20-1); i++){
          this.contadorData[i+1]=i+1;
        }
      },(err) => {
        this.loading=false;
      })
  }
  paginacion(numb:any){
    this.salto=numb;
    localStorage.setItem('paginacion',this.salto);
    this.servicio.getPublicaciones(this.salto)
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          this.loading=false;
          window.location.reload();
        }else{
          this.publicaciones = resp.objAux;
          this.loading=true;
          this.cantidad=resp.count;
          this.idBuscar='';
          this.usuarioActual();
          this.contadorGeneral = resp.countTotal;
          window.scroll({ 
            top: 0, 
            left: 0, 
            // behavior: 'smooth' 
          });
        }
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
    console.log(f)
    if((f.form.value.descripcion === '') || 
    (f.form.value.contenido === '') || 
    (f.form.value.tipoEnfermedad.nombre === "Seleccione una opcion")||
    (f.form.value.tipoEnfermedad === "Seleccione una opcion")||
    (f.form.value.tipoEnfermedad === undefined )){
      return ;
  }
  if(f.invalid){
    return ;
  }
    this.loading=false;
    this.servicio.publicar(f.form.value.descripcion,f.form.value.contenido,this.enfermedades[f.form.value.tipoEnfermedad])
      .subscribe(resp =>{
        this.openSnackBar();
        this.mostrar()
        f.reset({
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
        // console.log(this.idBuscar)
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
      // console.log(dato)
      this.servicio.comentarUnaPublicacion(idd, dato.form.value.termino)
          .subscribe(resp=>{
            // console.log(resp)
            this.mostrar()
            dato.reset();
          })
  }
/*   contarEnfermeades(){
    this.servicio.contarEnfermedades()
        .subscribe((resp:any) =>{
          this.enfermeades=resp.data;
        })
  } */
  buscarEnfermedad(dato:any){
    this.router.navigate(['usuario/buscarEnfermedad',dato._id])
  }
}
