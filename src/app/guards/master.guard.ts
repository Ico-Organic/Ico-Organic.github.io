import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class masterGuard implements CanActivate {
  public id: any = []
  public rol: any = []
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.User()

    if (route.params['id'] == this.id) {
      return true
    } else {
      if (this.id == '62cf4653f43b5132387d5537') {
        return true
      } else if (this.rol == 'Ingeniero') {
         this.router.navigateByUrl('usuarios/' + route.params['id']);
         return false
      } else {
        this.router.navigateByUrl('usuarios/' + route.params['id']);
        return false;
      }

    }



  }

  User() {
    var users: any = localStorage.getItem('UsuarioLogin');
    this.id = JSON.parse(users).id
    this.rol = JSON.parse(users).rol
  }


}
