import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboyutComponent } from './components/aboyut/aboyut.component';
import { UsuarioDetalleComponent } from './components/usuario/usuario-detalle/usuario-detalle.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuarioHomeComponent } from './components/usuario/usuario-home/usuario-home.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/loading/loading.component';
import { CapitalizadoPipe } from './pipe/capitalizado.pipe';
import { TextoLargoPipe } from './pipe/texto-largo.pipe';
import { TextoCortoPipe } from './pipe/texto-corto.pipe';
import { PipePipe } from './pipe/pipes.pipe';
import { UsuarioNuevoComponent } from './components/usuario/usuario-nuevo/usuario-nuevo.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LikeComponent } from './components/usuario/like/like.component';
import { CompartirComponent } from './components/usuario/compartir/compartir.component';
import { EditarPublicacionComponent } from './components/usuario/editar-publicacion/editar-publicacion.component';
import { EditarComentarioComponent } from './components/usuario/editar-comentario/editar-comentario.component';
import { ModificarPerfilComponent } from './components/usuario/modificar-perfil/modificar-perfil.component';
import { ComentarioComponent } from './components/usuario/comentario/comentario.component';
import { BuscarComponent } from './components/usuario/buscar/buscar.component';
import { BuscarEnfermedadComponent } from './components/usuario/buscar-enfermedad/buscar-enfermedad.component';
import { AboutComponent } from './components/about/about.component';
import { PublicarComponent } from './components/usuario/publicar/publicar.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PerfilAuxiliarComponent } from './components/usuario/perfil-auxiliar/perfil-auxiliar.component';
import { ObjArrayPipe } from './pipe/obj-array.pipe';
import { CambiarPasswordComponent } from './components/usuario/cambiar-password/cambiar-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboyutComponent,
    UsuarioDetalleComponent,
    NavbarComponent,
    UsuarioHomeComponent,
    UsuarioComponent,
    RegistrarseComponent,
    LoadingComponent,
    CapitalizadoPipe,
    TextoLargoPipe,
    TextoCortoPipe,
    PipePipe,
    UsuarioNuevoComponent,
    LikeComponent,
    CompartirComponent,
    EditarPublicacionComponent,
    EditarComentarioComponent,
    ModificarPerfilComponent,
    ComentarioComponent,
    BuscarComponent,
    BuscarEnfermedadComponent,
    AboutComponent,
    PublicarComponent,
    PerfilComponent,
    PerfilAuxiliarComponent,
    ObjArrayPipe,
    CambiarPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTabsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
