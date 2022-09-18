import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../services/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth:ServiceService, private route:Router){}

  canActivate(): boolean{
    if(this.auth.estaAutenticado()){
      return true;
    }else{
      this.route.navigateByUrl('/home');
      return false;
    }
  }
  
}
