import { Routes } from "@angular/router";
import { UsuarioNuevoComponent } from './usuario-nuevo/usuario-nuevo.component';
import { LikeComponent } from './like/like.component';
import { CompartirComponent } from './compartir/compartir.component';
import { PublicarComponent } from './publicar/publicar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModificarPerfilComponent } from './modificar-perfil/modificar-perfil.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { BuscarComponent } from './buscar/buscar.component';
import { BuscarEnfermedadComponent } from './buscar-enfermedad/buscar-enfermedad.component';
import { PerfilAuxiliarComponent } from './perfil-auxiliar/perfil-auxiliar.component';
import { EditarPublicacionComponent } from './editar-publicacion/editar-publicacion.component';

export const USUARIO_ROUTE: Routes = [
    { path: 'nuevo', component: UsuarioNuevoComponent},
    { path: 'like', component: LikeComponent},
    { path: 'compartir', component: CompartirComponent},
    { path: 'publicar', component: PublicarComponent},
    { path: 'perfil', component: PerfilComponent},
    { path: 'modificarPerfil', component: ModificarPerfilComponent},
    { path: 'comentario/:id', component: ComentarioComponent},
    { path: 'buscar/:id', component: BuscarComponent},
    { path: 'buscarEnfermedad/:id', component: BuscarEnfermedadComponent},
    { path: 'perfilAuxiliar/:id', component: PerfilAuxiliarComponent},
    { path: 'editarPublicacion/:id', component: EditarPublicacionComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'nuevo'}
]


