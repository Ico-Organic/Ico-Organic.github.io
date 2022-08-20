import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Parcela } from '../models/Parcela';
import { environment } from 'src/environments/environment';

const parcela: Parcela = {
  id: '',
  productor: '',
}
@Injectable({
  providedIn: 'root'
})
export class ParcelaService {
  url = environment.url+'parcela/';
  private parcela$ = new BehaviorSubject<Parcela>(parcela)
  constructor(private http: HttpClient) { }

  getParcelas(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  agregarParcela(parcela: Parcela): Observable<any> {
    return this.http.post(this.url, parcela);
  }

  UpdateParcela(id:string, body:any) {
    let url = `${this.url}actualizar/${id}`
    return this.http.put(url, body )
  }
  obtenerParcelaById(id: string): Observable<any> {
    console.log(id);

    return this.http.get(this.url+'obs/' + id);
  }
  obtenerParcelaId(id: string): Observable<any> {
    console.log(id);

    return this.http.get(this.url+'par/' + id);
  }

  get SelectParcela$(): Observable<Parcela> {
    return this.parcela$.asObservable()
  }
  setParcela(parcela: Parcela){
    this.parcela$.next(parcela)
  }
}
