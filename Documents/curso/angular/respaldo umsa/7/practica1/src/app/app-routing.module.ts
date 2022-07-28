import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { USUARIO_ROUTE } from './components/usuario/usuario.routes';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent},
  { path: 'about', component:AboutComponent},
  { path: 'registrarse/:id', component: RegistrarseComponent},
  { 
    path: 'usuario', 
    component:UsuarioComponent, canActivate: [AuthGuard],
    children: USUARIO_ROUTE,
    
  },
  { path:'**', pathMatch:'full', redirectTo: 'usuario/nuevo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 