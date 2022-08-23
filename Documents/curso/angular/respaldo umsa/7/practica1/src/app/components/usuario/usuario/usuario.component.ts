import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  title = 'proyeto2';
  publicaciones:any;
  enfermeades:any;
  sw:any=false;
  de:any='';
  publicacion:any='';
  validar:boolean=false;
  cargado:boolean=false;
  enfermedadesV:any={
    'ÁNTRAX':0,
    'ASMA':0,
    'AUTISMO':0,
    'ARTRITIS':0,
    'CÁNCER':0,
    'CLAMIDIA':0,
    'CULEBRILLA (HERPES ZÓSTER)':0,
    'DÉFICIT DE ATENCIÓN E HIPERACTIVIDAD':0,
    'DIABETES':0,
    'ÉBOLA':0,
    'EMBARAZO Y ETS':0,
    'ENFERMEDADES DE TRANSMISIÓN SEXUAL (ETS)':0,
    'ENFERMEDAD INFLAMATORIA PÉLVICA (EIP)':0,
    'ENFERMEDAD PULMONAR OBSTRUCTIVA CRÓNICA':0,
    'EPILEPSIA':0,
    'ESCARLATINA':0,
    'ESTREPTOCOCO DEL GRUPO B':0,
    'GONORRHEA':0,
    'HAEMOPHILUS INFLUENZAE TIPO B (HIB)':0,
    'HEMOFILIA':0,
    'HERPES GENITAL':0,
    'INFECCÍON GENITAL POR VPH':0,
    'INFLUENZA (GRIPE)':0,
    'LA SALUD MENTAL DE LOS NIÑOS (CHILDREN’S MENTAL HEALTH)':0,
    'LISTERIA (LISTERIOSIS)':0,
    'MENINGITIS':0,
    'NEUMONÍA':0,
    'PAPERAS':0,
    'POLIOMIELITIS':0,
    'RABIA':0,
    'REUMATISMO':0,
    'ROTAVIRUS':0,
    'SHIGELLA – SHIGELLOSIS':0,
    'SÍFILIS':0,
    'SILICOSIS':0,
    'SÍNDROME ALCOHÓLICO FETAL':0,
    'SÍNDROME DE FATIGA CRÓNICA (SFC)':0,
    'SÍNDROME DE TOURETTE':0,
    'TABAQUISMO':0,
    'TOSFERINA':0,
    'TRICOMONIASIS':0,
    'TUBERCULOSIS (TB)':0,
    'VAGINOSIS BACTERIANA':0,
    'VIH/SIDA':0,
    'ZIKA':0,
    '#OTRO':0,
  };

  existeToken:boolean =false;

  constructor(private servicio:ServiceService,
              private router:Router){
    this.contarEnfermeades(); 
  }
  ngOnInit(): void {
    if(localStorage.getItem('token'))
      this.existeToken = true;



    this.servicio.obtenerUsuarioActual()
      .subscribe((resp:any) =>{
        if(resp.msg === 'expiro'){
          localStorage.clear();
          window.location.reload();
          this.cargado=false;
        }else{
          this.publicacion=resp; 
          this.de=resp.usuario1.nombre.toUpperCase().charAt(0);
          this.cargado=true;
        }
      })
  }
  contarEnfermeades(){
    this.servicio.contarEnfermedades()
        .subscribe((resp:any) =>{
          this.enfermeades=resp.data;
        /*   this.enfermeades.map((resp:any)=> {
            this.enfermedadesV[resp._id] = resp.total;
          })
          for (const key in this.enfermedadesV) {
            console.log(key,'-',this.enfermedadesV[key])
          } */
        })
  }
  buscarEnfermedad(dato:any){
    this.router.navigate(['usuario/buscarEnfermedad',dato._id]);
  }
  login(){
    this.router.navigate(['login']);
  }
  registrarse(){
    this.router.navigate(['about']);
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
