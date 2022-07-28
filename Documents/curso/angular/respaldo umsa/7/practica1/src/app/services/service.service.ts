import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url:String = 'https://umsa-1.herokuapp.com';
  token:string = '';

  constructor(private http:HttpClient) { }
  getQuery(dato:string){
    return  (`${this.url}/${dato}`)
  }
  login(correo:any, password:any){
    let parametro = this.getQuery('api/login')
    return this.http.post(parametro,{
      "correo":correo,
      "password":password
    }).pipe(
      map((resp:any) =>{
      this.token=resp.token
      localStorage.setItem('token',''+resp.token);
        return resp
      })
    )
  }
  estaAutenticado () :boolean {
    // const t = localStorage.getItem('token')+'';
    // t.length > 2; 
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false
    }  
  }
  registrarUsuario(nombre:any,apellidoPaterno:any,apellidoMaterno:any,correo:any,password:any,rol:any,motivo:any){
    /* let parametro = this.getQuery('api/user')
    return this.http.post(parametro,{
      "nombre":nombre,
      "apellidoPaterno":apellidoPaterno,
      "apellidoMaterno":apellidoMaterno,
      "correo":correo,
      "password":password,
      "rol":rol,
    }).subscribe((resp:any)=>{
      localStorage.setItem('token',''+resp.token);
      this.token=resp.token
      window.location.reload();
      map( resp =>{
        resp
      })
    }) */
    let parametro = this.getQuery('api/user')
    return this.http.post(parametro,{
      "nombre":nombre,
      "apellidoPaterno":apellidoPaterno,
      "apellidoMaterno":apellidoMaterno,
      "correo":correo,
      "password":password,
      "motivo":motivo,
      "rol":rol,
    }).pipe( 
   
      map( (resp:any) =>{ 
      localStorage.setItem('token',''+resp.token);
      this.token=resp.token
      window.location.reload();
        return resp
      })
    )
  }
  getPublicaciones(){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    let parametro = this.getQuery('api/buscar/mostrarTodasLasPublicaciones/0');
    return this.http.get(parametro,{headers});
  }
  publicar(descripcion:any,contenido:any,tipoEnfermedad:any){ // auiq publicar
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery('api/publicacion');
    return this.http.post(parametro,{
      "descripcion":descripcion,
      "contenido":contenido,
      "tipoEnfermedad":tipoEnfermedad
    },{headers})

  }
  modificarPublicar(id:any,descripcion:any,contenido:any,tipoEnfermedad:any){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery(`api/publicacion/${id}`);
    return this.http.put(parametro,{
      "descripcion":descripcion,
      "contenido":contenido,
      "tipoEnfermedad":tipoEnfermedad
    },{headers})

  }
  eliminarPublicar(id:any){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery(`api/publicacion/${id}`);
    return this.http.delete(parametro,{headers})

  }
  buscarLikeUsuarioX(){ //2
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      "x-token":datoF+''
    })
    const parametro = this.getQuery('api/buscar/buscarLikeUsuariox/0');
    return this.http.get(parametro,{headers});

  }
  buscarCompartidosUsuarioX(){ //3
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      "x-token":datoF+''
    })
    const parametro = this.getQuery('api/buscar/buscarCompartirUsusriox/0');
    return this.http.get(parametro, {headers});

  }  
  mostrarUsuarioX(){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery('api/user/621cf6354887e048451091c4');
    return this.http.get(parametro);
  }
  likePublicacion(id:any){
    // 622670d988090a48b8516fc6
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery(`api/buscar/likePublicacion/${id}`)
    return this.http.get(parametro,{headers})
  }
  likeComentario(id:any){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery(`api/buscar/likeComentario/${id}`)
    return this.http.get(parametro,{headers})
  }
  compartirPublicacion(id:any){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery(`api/buscar/compartir/${id}`)
    return this.http.get(parametro,{headers})
  }
  reportarPublicacion(id:any){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery(`api/buscar/reportarPublicacion/${id}`)
    return this.http.get(parametro,{headers})
  }
  reportarComentario(id:any){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token':datoF+''
    })
    const parametro = this.getQuery(`api/buscar/reportarComentario/${id}`)
    return this.http.get(parametro,{headers})
  }
  obtenerUsuarioActual( ){ /// 1
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      "x-token":datoF+''
    })
    // api/buscar/usuarioActual/6242438f5893fe4b441b4f0f
    const parametro = this.getQuery(`api/buscar/usuarioActual/6287b393cd4bbe83fef91bee`);
    return this.http.get(parametro,{headers});
  }
  publicacionesUsuarioX(){ // 4
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      "x-token":datoF+''
    })
    const parametro = this.getQuery(`api/buscar/mostrarPublicacionesDelUsuarioX/0`)
    return this.http.get(parametro,{headers})
  }
  contarEnfermedades(){
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      "x-token":datoF+''
    })
    const parametro = this.getQuery(`api/buscar/buscarContarPorEnfermedad/0`)
    return this.http.get(parametro,{headers})
  }
  buscarEnfermedadX(enfermedad:any){ // enfermedad
    let datoF=localStorage.getItem('token');
    const headers = new HttpHeaders({
      "x-token":datoF+''
    })
    const parametro = this.getQuery(`api/buscar/buscarPorTipoEnfermedad/${enfermedad}`)
    return this.http.get(parametro,{headers})
  }
  actualizarUsuario(id:any,nombre:any,apellidoPaterno:any,apellidoMaterno:any){
    const parametro = this.getQuery(`api/user/${id}`)
    return this.http.put(parametro,
      {
        "nombre":nombre,
        "apellidoPaterno":apellidoPaterno,
        "apellidoMaterno":apellidoMaterno,
      })
    }
    mostrarPublicacionX(id:any){
      const parametro = this.getQuery(`api/publicacion/${id}`)
      return this.http.get(parametro)
    }
    mostrarComentarioPublicacionX(id:any){
      // api/buscar/buscarComentarioDePublicacionX/622517bbec3c7fd69ca82484
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/buscar/buscarComentarioDePublicacionX/${id}`)
      return this.http.get(parametro,{headers})
    }
    comentarUnaPublicacion(id:any,contenido:any){
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/comentario`)
      return this.http.post(parametro,{
          "contenido":contenido,
          "publicacion":id
      },{headers})
    }
    mostrarUnaPublicacionAvanzada(id:any){
      // api/buscar/mostrarUnaPublicacionX/623de52f3b3b60dbbb649e31
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/buscar/mostrarUnaPublicacionX/${id}`)
      return this.http.get(parametro,{headers})
      
    }
    buscarPublicacionParametroX(dato:any){ // por descripcion
      //api/buscar/buscarConParametroX/ESTO
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/buscar/buscarConParametroX/${dato}`)
      return this.http.get(parametro,{headers})
    }
    salir(){
      localStorage.removeItem('token');
    }
    // reportarComentario(idC:number){
    //   const datoFF = localStorage.getItem('token');
    //   const headers = new HttpHeaders({
    //     "x-token":datoFF+''
    //   })
    //   const parametro = this.getQuery(`api/buscar/reportarComentario/${idC}`)
    //   return this.http.get(parametro,{headers})
    // }
    modificarComentario(contenido:any, iddd:any, idP:any){
      console.log('contenido'+contenido)
      console.log('iddd'+iddd)
      console.log('idP'+idP)
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      
      const parametro = this.getQuery(`api/comentario/${iddd+''}`)
      return this.http.put(parametro,{
        "contenido":contenido,
        "publicacion": idP+''
      },{headers})
    }
    eliminarComentario(idC:any){
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      });
      const parametro = this.getQuery(`api/comentario/${idC}`) 
      return this.http.delete(parametro,{headers});
      
    }
    usuarioActual(){
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      });
      const parametro = this.getQuery(`api/buscar/usuarioActual/0`) 
      return this.http.get(parametro,{headers});
    }
    obtenerUsuarioActual1(id:any ){ // 1
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/buscar/usuarioActual1/${id}`);
      return this.http.get(parametro,{headers});
    }
    buscarLikeUsuarioX1(id:any){ //2
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/buscar/buscarLikeUsuariox1/${id}`);
      return this.http.get(parametro,{headers});
    }
    buscarCompartidosUsuarioX1(id:any){ //3
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/buscar/buscarCompartirUsusriox1/${id}`);
      return this.http.get(parametro, {headers});
    }  
    publicacionesUsuarioX1(id:any){ // 4
      let datoF=localStorage.getItem('token');
      const headers = new HttpHeaders({
        "x-token":datoF+''
      })
      const parametro = this.getQuery(`api/buscar/mostrarPublicacionesDelUsuarioX1/${id}`)
      return this.http.get(parametro,{headers})
    }
}
