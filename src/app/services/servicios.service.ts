import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Receta } from '../models/receta';
import { Agenda } from '../models/Agenda';
import { environment } from 'src/environments/environment';


const Agendar: Agenda = {
  fechaFin: '',
  fechaIni: '',
  horaFin: '',
  horaIni: ''
}



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  url = environment.url + 'servicios/';
  private agenda$ = new BehaviorSubject<Agenda>(Agendar)
  /* http://localhost:4000/api*/
  constructor(private http: HttpClient) { }
  
  
  agregarReceta(receta: Receta): Observable<any> {
    return this.http.post(this.url, receta);
  }
  getRecetas(): Observable<any> {
    return this.http.get(this.url);
  }
  getRecetasParcela(id: string): Observable<any> {
    console.log(id);

    return this.http.get(this.url + 'parcela/' + id);

  }
  getRecetasProductor(id: string): Observable<any> {
    console.log(id);
console.log("errpooo");

    return this.http.get(this.url + 'productor/' + id);

  }
  /**################## SERVICOS DE LA AGENDA  #############################*/

  agregarCita(agenda: Agenda): Observable<any> {
    return this.http.post(this.url + 'agenda/', agenda);
  }
  getCitasId(id: string): Observable<any> {
    console.log(id);

    return this.http.get(this.url + 'mis-cita/' + id);
  }
  getCitasIdAll(id: string): Observable<any> {
    console.log(id);

    return this.http.get(this.url + 'mis-citas/' + id);
  }
  getCitasIdAllBy(id: string): Observable<any> {
    console.log(id);

    return this.http.get(this.url + 'mis-citas-by/' + id);
  }
  getCitas(): Observable<any> {
    return this.http.get(this.url + 'citas/');
  }
  UpdateCitaStatus(id:string, body:any) {
    let url = `${this.url}actualizar-status/${id}`
    return this.http.put(url, body )
  }
  UpdateReceta(id:string, body:any) {
    let url = `${this.url}actualizar-receta/${id}`
    return this.http.put(url, body )
  }
  get SelectCita$(): Observable<Agenda> {
    return this.agenda$.asObservable()
  }
  setAgenda(agenda: Agenda){
    this.agenda$.next(agenda)
  }


}
