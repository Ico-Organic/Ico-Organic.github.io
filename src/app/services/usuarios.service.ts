import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { Usuarios } from '../models/usuarios';  
import { Receta } from '../models/receta';  
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = environment.url+'/api/usuarios/';
 /* http://localhost:4000/api*/
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }
  login(usuario: Usuarios): Observable<any> {
    return this.http.post(this.url+'login/',
    usuario).pipe(tap(
        (res: Usuarios) => {res
          
        })
      ); 
  }

  UpdateUsuario(id:string, body:any) {
    let url = `${this.url}actualizar/${id}` 
    return this.http.put(url, body )
  }


  guardarUsuario(usuario: Usuarios): Observable<any> {
    return this.http.post(this.url, usuario);
  }

  obtenerUsuario(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  
}
