import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agenda } from '../../models/Agenda';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ParcelaService } from 'src/app/services/parcela.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SolicitudComponent implements OnInit {
  public parcela: any[] = [];
  public parcelaHis: any[] = [];
  public parcelas: any[] = [];
  public usuario: any[] = [];
  public productor: any[] = [];
  public selection: any = []
  public idS:any = []
  public user: any = localStorage.getItem('UsuarioLogin');
  public IsUs: any = ''
  public IsMasCoun: Boolean = false
  public IsMasString: string = ''

  public idUser: any = ''
  public agenda: any = {
    id: "",
    fechaIni: "",
    fechaFin: "",
    horaIni: "",
    horaFin: "",
    title: "",
    description: "",
    tipo: "",
    status: "",
  }
  Seleted$: any = this._ServiciosService.SelectCita$

  mostrarContrasena: boolean = false;
  registroForm: FormGroup;
  paso = false;
  public id: any = ''
  constructor(private modal: NgbModal, private activatedRoute: ActivatedRoute,
    private router: Router,
    private _ServiciosService: ServiciosService, private _ParcelaService: ParcelaService, private route: ActivatedRoute, private toastr: ToastrService, private _UsuariosService: UsuariosService, private _AuthGuard: AuthGuard) {
    this.registroForm = new FormGroup({
      solicitorBy: new FormControl([], [Validators.required]),
      solicitorTo: new FormControl([], [Validators.required]),
      fechaIni: new FormControl([], [Validators.required]),
      fechaFin: new FormControl([], [Validators.required]),
      horaIni: new FormControl([], [Validators.required]),
      horaFin: new FormControl([], [Validators.required]),
      title: new FormControl([], [Validators.required]),
      parcela: new FormControl([null]),
      receta: new FormControl([null]),
      description: new FormControl([], [Validators.required]),
      tipo: new FormControl([], [Validators.required]),
      status: new FormControl('PENDIENTE', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.idS = this._AuthGuard.IsIDS()

    this.IsMasString = this._AuthGuard.IsIngString()
    console.log(this.IsMasString);

    this.getlis()
    this.IsMasCoun = this._AuthGuard.IsMasterCount()
    

    this.ErrorExiste()
    //this.Existe()

    setTimeout((): void => {
      this.IsCount()
    }, 1000)

    this.getPar()

    console.log(this.IsUs);

    console.log(this.idUser);
    this.SelectPerson()

    // this.ShowDateParcela()
  }
  IsCount() {
    if (this.idUser!) {
      this._ServiciosService.SelectCita$.subscribe((agenda: Agenda) => this.selection = agenda)
      console.log(this.selection.fechaIni);

      this.registroForm.patchValue({
        fechaIni: this.selection.fechaIni,
        fechaFin: this.selection.fechaFin,
        horaIni: this.selection.horaFin,
        horaFin: this.selection.horaIni,
      })
      console.log(this.registroForm.value);
      if (this.IsMasCoun == true) {
        console.log("MI AGENDA---------------");

        if (this.IsMasString != 'Productor') {
          console.log("MI ing---------------");

          this.parcela = []
          this.registroForm.patchValue({ solicitorTo: this.idUser })
          this.chooseUser(this.idUser)
        }
      } else {
        console.log("LA AGENDA DE OTRO -----------");
        if (this.IsMasString == 'Productor') {
          this.parcela = []
          this.registroForm.patchValue({ solicitorTo: this.idUser })
          this.chooseUser(this.idS)
        }else  {
          this.registroForm.patchValue({ solicitorTo: this.idUser })
          this.chooseUser(this.idUser)
        }
      }

    }
  }



  SelectDate(event: any) {
    console.log(event);
    console.log("aqui esta el error");
    
    // agregar un dia 
    //var newevent = moment(moment(new Date(event)).add(24, 'hours').format('LLL')).format("yyyy-MM-DD").toLocaleString()
    var newevent = moment(moment(new Date(event))).format("yyyy-MM-DD").toLocaleString()
    console.log(newevent);
    
    this.registroForm.patchValue({ fechaFin: newevent, fechaIni: newevent })
  }

  IsTypeUSer() {
    if (JSON.parse(this.user).rol == 'Ingeniero') {

      return "Ingeniero"
    } else if (JSON.parse(this.user).rol == 'Productor') {

      return "Productor"
    }
    return
  }
  ErrorExiste() {
    if (JSON.parse(this.user)!) {
      this.IsUs = this.IsTypeUSer()

    }
  }
  SelectPerson() {
    this.registroForm.patchValue({ solicitorBy: JSON.parse(this.user).id })
  }
  getPar() {
    this._ParcelaService.getParcelas().subscribe(data => {
      console.log(data);
      this.parcelas = data
    })


  }

  getlis() {
    this._UsuariosService.getUsuarios().subscribe(data => {
      this.usuario = data.filter((element: any) => element.rol != this.IsMasString);
      console.log("Aqui hay ------------------------------------");

      console.log(this.usuario);

    }, error => {
      console.log(error);

    });

  }
  SelectHour() {

    this.registroForm.patchValue({ horaFin: this.registroForm.value.horaIni })

  }
  chooseUser(event: string) {
    console.log(event);
    this.parcela = []
    if (this.IsMasString == 'Productor') {
      this.parcelas.filter((element: any) => {
        if (element.productor == this.idS) {
          this.parcela.push(element)
        }
      });
    }else{
      console.log(this.registroForm.value.solicitorTo);
      this.parcelas.filter((element: any) => {
        if (element.productor == this.registroForm.value.solicitorTo) {
          this.parcela.push(element)
        }
      });
    }
    
  }
  registrarSubmit() {
    console.log(this.registroForm.value);

    const Agenda: Agenda = {
      solicitorBy: this.registroForm.value.solicitorBy,
      solicitorTo: this.registroForm.value.solicitorTo,
      parcela: this.registroForm.value.parcela,
      receta: '62dc519da6835c5b18bb1fd6',
      fechaIni: this.registroForm.value.fechaIni,
      fechaFin: this.registroForm.value.fechaFin,
      horaIni: this.registroForm.value.horaIni,
      horaFin: this.registroForm.value.horaFin,
      title: this.registroForm.value.title,
      description: this.registroForm.value.description,
      tipo: this.registroForm.value.tipo,
      status: this.registroForm.value.status
    }
    console.log(Agenda);

    console.log(this.registroForm.value);
    console.log(this.id);
    if (this.registroForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'FALTAN CAMPOS',
        text: 'Rellene todos los campos',

      });
    } else {

      this._ServiciosService.agregarCita(Agenda).subscribe(data => {
        console.log(data);

        this.toastr.success('Esperemos la confirmacion del usuario', 'Cita enviada', {
          positionClass: 'toast-top-right'
        });
        this.modal.dismissAll();
        this.registroForm.reset()
        this.router.navigate(['/usuarios/', this.idUser]);

      }, error => {
        this.toastr.error('Confirme su conexión a la red', 'No se pudo enviar la cita', {
          positionClass: 'toast-top-right'
        });
      })

    }

  }


}
