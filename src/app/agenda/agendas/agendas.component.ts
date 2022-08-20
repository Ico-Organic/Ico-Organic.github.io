import { Component, OnInit, ViewChild, forwardRef,TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { Calendar, CalendarOptions, DateSelectArg, EventClickArg, EventInput, FullCalendarComponent, CalendarApi } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as Moment from 'moment'; /// calendario
import { ServiciosService } from '../../services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agenda } from 'src/app/models/Agenda';


@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css'],

})
export class AgendasComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;
  @ViewChild("Calendar") calendarComponent:any = FullCalendarComponent;

  modalReference:any = NgbModal;
  calendarApi:any =  CalendarApi;
  calendarOptions: CalendarOptions | any;
  public dates: any[] = []
  public user:any = {
    id:""
  }
    calendarPlugins = [
    timeGridPlugin,
    interactionPlugin,
  ]
  public date = {
    id: "",
    description: "",
    fechaFin: "",
    fechaIni: "",
    horaFin: "",
    horaIni: "",
    solicitorBy: {
      nombre: "",
      apellidoPa: "",
      apellidoMa: "",
      id: ""
    },
    solicitorTo: {
      nombre: "",
      apellidoPa: "",
      apellidoMa: "",
      id: ""
    },
    status: "",
    tipo: "",
    title: "",

  }
  events: EventInput[] = [];



  constructor(private _ServiciosService: ServiciosService,private router: Router, private route: ActivatedRoute,private modal: NgbModal,) {

  }
  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id')
    forwardRef(() => Calendar);
    this.getCitas()

    this.cargarcalendario()

  }
  hideModal() {
    console.log("cerrar");

    this.modal.dismissAll();
  }
  getCitas() {
    console.log("this.user.id");
    console.log(this.user.id);

    this._ServiciosService.getCitasId(this.user.id).subscribe(data => {

      console.log(data);

        this.dates = data
        this.ShowViewDates(data)
    });


  }

  calendarVisible = true;
  cargarcalendario() {
    this.calendarOptions = {
      headerToolbar: {
        right: 'title',
        left: 'prev,next today',
      },
      footerToolbar: {
        center: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      titleFormat: { // will produce something like "Tuesday, September 18, 2018"
        month: 'long',
        year: 'numeric',

      },
      initialView: 'timeGridWeek',
      plugins: this.calendarPlugins,
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'localeEs'
      },
      dayHeaderFormat: {
        weekday: 'short',
        day: 'numeric'
      },
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'localeEs'
      },
      events: this.events, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      navLinks: true,
      locale: esLocale,
      selectMirror: true,
      dayMaxEvents: true,
      nowIndicator: true,
      fixedWeekCount: false,
      slotDuration: '00:60:00',
      slotLabelInterval: 60,
      slotMinTime: '08:00:00',
      slotMaxTime: '18:00:00',
      showNonCurrentDates: false,
      select: this.handleDateSelect.bind(this),
      height: 700,
      expandRows: false,
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);

     this.modal.open(this.modalContent, { size: 'sm' })
     var formattedhours = moment(selectInfo.start, "HH:mm:ss").format("HH:mm");
     var formattedhours2 = moment(selectInfo.end, "HH:mm:ss").format("HH:mm");
     var formatteddate = moment(selectInfo.startStr).format("YYYY-MM-DD");
     var formatteddate2 = moment(selectInfo.endStr).format("YYYY-MM-DD");

    console.log(formattedhours);
    console.log(formattedhours2);
    console.log(formatteddate);
    console.log(formatteddate2);



     const agenda: Agenda ={
        fechaFin:formatteddate,
        fechaIni:formatteddate2,
        horaFin:formattedhours,
        horaIni:formattedhours2,
     }

     this._ServiciosService.setAgenda(agenda)

    /* let Obj = this.dates.find(element => {
      if (element._id == selectInfo.event._def.publicId) {
        this.date.solicitorBy.nombre = element.solicitorBy.nombre
        this.date.solicitorBy.apellidoMa = element.solicitorBy.apellidoMa
        this.date.solicitorBy.apellidoPa =  element.solicitorBy.apellidoPa
        this.date.solicitorTo.nombre = element.solicitorTo.nombre
        this.date.solicitorTo.apellidoMa = element.solicitorTo.apellidoMa
        this.date.solicitorTo.apellidoPa =  element.solicitorTo.apellidoPa
      }
    }


    );*/
    //console.log(Obj);

  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event._def.publicId);
    let Obj = this.dates.find(element => {
      if (element._id == clickInfo.event._def.publicId) {
        this.date.solicitorBy.nombre = element.solicitorBy.nombre
        this.date.solicitorBy.apellidoMa = element.solicitorBy.apellidoMa
        this.date.solicitorBy.apellidoPa =  element.solicitorBy.apellidoPa
        this.date.solicitorTo.nombre = element.solicitorTo.nombre
        this.date.solicitorTo.apellidoMa = element.solicitorTo.apellidoMa
        this.date.solicitorTo.apellidoPa =  element.solicitorTo.apellidoPa
      }
    }


    );
    console.log(Obj);

    Swal
      .fire({
        title: "VER CITA",
        text: "Con:"+ this.date.solicitorBy.nombre+" "+this.date.solicitorBy.apellidoPa,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: "VER DETALLES",
        cancelButtonText: "CANCELAR CITA",
      })
      .then(resultado => {
        if (resultado.value) {
          resultado.value
        } else {
          localStorage.removeItem('ActualizarUsuarioID')
        }
      });



    /* if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
       clickInfo.event.remove();
     }*/
  }


  agregarEvento(data: any) {
    console.log(data);
    console.log("agregar eventos");


    if (data.start != undefined) {

      let event00 = [
        ...this.events,
        data
      ]
      console.log(this.events);

      this.events = Array.from(new Set(event00.map(s => s.id)))
        .map(id => {

          return {
            ...event00.find(s => s.id === id)
          };
        });
    }
  }
  ShowViewDates(result: any) {
    console.log(result);

    result.forEach((elemen: any) => {
      let timefinal = this.OutDate(elemen.fechaIni, elemen.horaIni),
        timefinal2 = this.OutDate2(elemen.fechaFin, elemen.horaFin),
        eventos = {
          id: elemen._id,
          title: elemen.title,
          start: timefinal,
          end: timefinal2,
          editable: false,
          color: '#269911'

        }
      console.log(eventos)
      this.agregarEvento(eventos);
    })
    this.cargarcalendario();
  }
  OutDate(a: string, b: boolean) {
    if (a != null && b != null) {

      let aa = a.toString()
      let bb = b.toString()
      let timefinal = aa + 'T' + bb + ':00'

      return timefinal
    }
    return

  }

  OutDate2(c: string, d: boolean) {
    if (c != null && d != null) {
      let cc = c.toString()
      let dd = d.toString()

      let timefinal2 = cc + 'T' + dd + ':00'

      return timefinal2
    }
    return
  }

}
