import { FormGroup, } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Agenda } from '../../models/Agenda';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Receta } from 'src/app/models/receta';
import { AuthGuard } from 'src/app/guards/auth.guard';
import * as moment from 'moment';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ]
})
export class PerfilComponent implements OnInit {
  public user: any = {
    id: "",
  }
  firstFormGroup: any = FormGroup;
  secondFormGroup: any = FormGroup;
  public pagina = 0;
  public pagina1 = 0;
  config: any;
  config2: any;
  config3: any;
  config4: any;
  public productores: any = []
  public asesorias: any = []
  public citas: any = []
  public citas2: any = []
  public citasPendientes: any = []
  public citasHoy: any = []
  public citasAll: any = []
  public citasPendientes2: any = []
  public citasHoy2: any = []
  public citasAll2: any = []
  public exist:Boolean = false
  public existMas:Boolean = false
  public calendar: undefined
  public Send:Number | undefined
  constructor(private activatedRoute: ActivatedRoute,private _AuthGuard: AuthGuard, private _ParcelaService: ParcelaService, private router: Router, private _ServiciosService: ServiciosService) {
    this.PaginateIndex()
  }
  PaginateIndex() {
 

    this.config3 = {
      id: 'basicPaginate3',
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.citasAll.length
    };
    this.config4 = {
      id: 'basicPaginate4',
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.citasAll2.length
    };
  
  }

  ngOnInit(): void {

    
    this.user.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.existMas = this._AuthGuard.IsMasterCount()

    this.exist = this._AuthGuard.IsIng()
    console.log(this.exist);

    this.getMydatesId()
    this. getMydatesIdBy() 
    console.log("pendientes2");
    
console.log(this.citas2);

  }

  ObtenerFecha() {
    let date = new Date();
    let output= moment(date).format("YYYY-MM-DD");
    return output
  }
  addPar() {
    console.log(this.user.id);

    this.router.navigate([`/crear-parcela/${this.user.id}`]);

  }
  
  SelectParc(event: any) {
    console.log(event);
    this.router.navigate([`/ver-parcela/${event._id}`]);
  }
  
  getMydatesId() {

    console.log(this.user.id);

    this._ServiciosService.getCitasIdAll(this.user.id).subscribe((data:any) => {
    console.log("--------------------------------------------------------1");
      console.log("aqui comienzas");
      console.log(data);
      this.citas = data
      this.TypeDates()
    },error =>{
      console.log(error);
      
    });
  

  }
  getMydatesIdBy() {
    
    this._ServiciosService.getCitasIdAllBy(this.user.id).subscribe(data => {

      this.citas2 = data
      console.log(this.citas2);
      
      this.TypeDatesBy()

    },error =>{
      console.log(error);
      
    });
  
  

  }
  TypeDates() {
    let date = this.ObtenerFecha()
    console.log(date);
    console.log(this.citas2);
  
    this.citas.forEach((element: any) => {
      if (element.status == 'PENDIENTE') {
        this.citasPendientes.push(element)
      }
      if (element.fechaIni == date && element.status == 'APROBADA') {
        this.citasHoy.push(element)
      }
      if (element.status!) {
        this.citasAll.push(element)
      }
   
    });
    console.log("------------------------------------3.1");
    console.log(this.citas2);

    console.log(this.citasAll);
    console.log(this.citasHoy);
    console.log(this.citasPendientes);
  }
  TypeDatesBy() {
    let date = this.ObtenerFecha()
  
    this.citas2.forEach((element: any) => {
      if (element.status == 'PENDIENTE') {
        this.citasPendientes2.push(element)
      }
      if (element.fechaIni == date && element.status == 'APROBADA') {
        this.citasHoy2.push(element)
      }
      if (element.status!) {
        this.citasAll2.push(element)
      }
     
     
    });
    console.log("------------------------------------3");
    console.log(this.citasAll2);
    console.log(this.citasHoy2);
    console.log(this.citasPendientes2);
    
  }
 
  pageChanged3(event: any) {
    this.config3.currentPage = event;
  }
  pageChanged4(event: any) {
    this.config4.currentPage = event;
  }
  Update(item:any,status:any){
    console.log(item);
    
    this._ServiciosService.UpdateCitaStatus(item._id,status).subscribe(data => {
      console.log(data);
      
      Swal.fire({
        icon: 'success',
        title: 'CITA ACTUALIZADA',
        text: 'Correctamente',

      })
     
    },error =>{
      console.log(error);
      
    });
  }
  cancelarcita(event: any,item:any, index: any) {
 
    const status: Agenda = {
      status: 'CANCELADA'
    }
console.log("-----------------------------");

    console.log(item);
    console.log(status);
    console.log(index);
    
    this.citasPendientes.forEach((element:any) => {
        console.log(element);
        
    });
  
    this.Update(item,status)

    this.aceptarCita(event, item, index,'back')
    if (event == "pen") {
      return this.citasPendientes.splice(index, 1)
    }
    else if (event == "hoy") {
      return this.citasHoy.splice(index, 1)
    }
 
    
  }
  aceptarCita(event: any, item: any, index: any, Qo:any) {
    console.log(event);
    console.log("1---------");
    
    let si = this.isHoy(item)
    console.log(si);
    const status: Agenda = {
      status: 'APROBADA'
    }
    if(Qo == 'front'){

      this.Update(item,status)
      item.status = 'APROBADA'
  
    }
    this.citasPendientes.splice(index,1)
    if (event == 'pen') {
      if (si == true) {
        this.citasHoy.push(item)

      }

    }


  }
  cancelarcita2(event: any,item:any, index: any) {

    const status: Agenda = {
      status: 'CANCELADA'
    }
    this.Update(item,status)
   
    this.aceptarCita2(event, item, index,'back')
    if (event == "pen") {
      return this.citasPendientes2.splice(index, 1)
    }
    else if (event == "hoy") {
      return this.citasHoy2.splice(index, 1)
    }
    
    
  }
  aceptarCita2(event: any, item: any, index: any, Qo:any) {

    
    let si = this.isHoy(item)
    console.log(si);
    const status: Agenda = {
      status: 'APROBADA'
    }
    if(Qo == 'front'){

      this.Update(item,status)
      item.status = 'APROBADA'
    }
    this.citasPendientes2.splice(index,1)
    if (event == 'pen') {
      if (si == true) {
        this.citasHoy2.push(item)

      }
    

    }


  }
  isHoy(item: any) {
    console.log(item);
    
    let date = this.ObtenerFecha()
    if (item.fechaIni == date) {
      return true
    } else {
      return false
    }
  }
  AgregarReceta(eventPar:any,eventBy:any,evenetId:any){
   
    const agenda: Receta ={
      productor:eventBy,
      sta:'PENDIENTE',
      id:evenetId
   }
   console.log(agenda);
   
   this._ServiciosService.setAgenda(agenda)
   this.router.navigate([`/receta/${eventPar}`]);

  }
}

