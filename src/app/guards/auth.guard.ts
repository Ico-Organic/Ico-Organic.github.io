import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { masterGuard } from './master.guard';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  public id: any = []
  public idresp: any = []
  public rol: any = []
  public exist: any = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.IsMaster()
    this.IsIng()
    this.IsID()

    this.idresp = route.params['id']
    this.IsMasterCount()
    if (localStorage.getItem('UsuarioLogin')!) {
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  existelogin() {
    if (localStorage.getItem('UsuarioLogin')!) {
      return localStorage.getItem('UsuarioLogin')
    } else {
      return []
    }
  }

  IsMaster() {
    let resp: Boolean = false

    var users: any = localStorage.getItem('UsuarioLogin');
    if (localStorage.getItem('UsuarioLogin')!) {
      this.id = JSON.parse(users).id
      if (this.id == '62cf4653f43b5132387d5537') {
        resp = true
        return resp
      } else {
        resp = false
        return resp
      }
    }
    return resp
  }
  IsMasterCount() {
    let resp: Boolean = false

    var users: any = localStorage.getItem('UsuarioLogin');
    if (localStorage.getItem('UsuarioLogin')!) {

      if (this.idresp == JSON.parse(users).id) {
        resp = true
        return resp
      } else {
        resp = false
        return resp
      }
    }
    return resp
  }
  IsIng() {
    let resp: Boolean = false

    var users: any = localStorage.getItem('UsuarioLogin');
    if (localStorage.getItem('UsuarioLogin')!) {
      this.rol = JSON.parse(users).rol
      if (this.rol == 'Ingeniero') {
        resp = true
        return resp
      } else {
        resp = false
        return resp
      }
    }
    return resp
  }
  IsIngString() {

    var users: any = localStorage.getItem('UsuarioLogin');
    if (localStorage.getItem('UsuarioLogin')!) {
      return JSON.parse(users).rol

    }
  }
  IsID() {
    
    return  this.idresp
  }
  IsIDS() {
    var users: any = localStorage.getItem('UsuarioLogin');
    return  JSON.parse(users).id
  }
}
