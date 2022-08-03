import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ParcelaService } from 'src/app/services/parcela.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Receta } from '../models/receta';
import { ActivatedRoute } from '@angular/router';

import { Agenda } from '../models/Agenda';
import * as $ from 'jquery';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})

export class RecetasComponent implements OnInit {
  @ViewChild('registroForm') registroNgForm: any = NgForm;
  secondFormGroup: FormGroup;
  addEventForm2: any = FormGroup;
  suelos: FormGroup;
  foliares: FormGroup;
  public id: any = ''
  FormFish: FormGroup;
  public recetaPDF = {
    height: 3.7,
    width: 1.5,
    whithEspacio: 3.4
  }
  public recetas: any = [];
  public productores: any[] = [];
  public parcelas: any[] = [];
  public parcelaFil: any[] = [];
  public date = new Date();

  public form: any = {
    atendio: '',
    productor: '',
    cultivo: '',
    ejido: '',
    novista: '',
    sup: '',
    mun: '',
    cont: '',

  }
  selection: any;
  constructor(private _UsuariosService: UsuariosService, private route: ActivatedRoute, private _ServiciosService: ServiciosService, private _ParcelaService: ParcelaService, private _formBuilder: FormBuilder, private toastr: ToastrService) {

    this.secondFormGroup = new FormGroup({
      atendio: new FormControl([], [Validators.required]),
      productor: new FormControl([], [Validators.required]),
      ejido: new FormControl([], [Validators.required]),
      novista: new FormControl(1, [Validators.required]),
      sup: new FormControl('SUP...', [Validators.required]),
      cultivo: new FormControl([], [Validators.required]),
      mun: new FormControl([], [Validators.required]),
      contac: new FormControl([], [Validators.required]),
      engordefol: new FormControl([], [Validators.required]),

    });
    this.addEventForm2 = new FormGroup({
      productor: new FormControl([], Validators.required),
      parcela: new FormControl([], Validators.required)
    });
    this.FormFish = new FormGroup({
      ingeniero: new FormControl([], [Validators.required]),
      productor: new FormControl([], [Validators.required]),
      parcela: new FormControl([], [Validators.required]),
      suelo: this._formBuilder.array([]),
      foliares: this._formBuilder.array([])
    });
    this.suelos = this._formBuilder.group({
      oxisul: new FormControl([], [Validators.required]),
      enraizadorsul: new FormControl([], [Validators.required,]),
      vegetativosul: new FormControl([], [Validators.required]),
      floracionsul: new FormControl([], [Validators.required]),
      engordesul: new FormControl([], [Validators.required]),
    });
    this.foliares = this._formBuilder.group({
      oxifol: new FormControl([], [Validators.required]),
      enraizadorfol: new FormControl([], [Validators.required]),
      vegetativofol: new FormControl([], [Validators.required]),
      floracionfol: new FormControl([], [Validators.required]),
      engordefol: new FormControl([], [Validators.required]),
    });




  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.SelectIngeniero()

    this.getlis()
    this.getParcela()
    this.getRecetas()
    
    this.ExisteUsuarios()





  }



  ExisteUsuarios() {
    if (this.id!) {

      this._ServiciosService.SelectCita$.subscribe((agenda: Agenda) =>
          this.selection = agenda
        )
        console.log("SELECET STATUUUUUUUUUUUUUUUUUUUS");

      console.log(this.selection);

      this.addEventForm2.patchValue({
        productor: this.selection.productor,
        parcela: this.id,

      })

      console.log(this.addEventForm2.value);
      setTimeout(() => {

        this.chooseprod(this.addEventForm2.value.productor)

      }, 1000);
      setTimeout(() => {

        this.choosepar(this.id)

      }, 1000);

    }





  }
  get servicioExtArr() {
    return this.FormFish.get("suelo") as FormArray;
  }
  get servicioExtArr2() {
    return this.FormFish.get("foliares") as FormArray;
  }
  getlis() {

    this._UsuariosService.getUsuarios().subscribe(data => {
      console.log(data);

      this.productores = data
      this.productores = this.productores.filter(element => element.rol == 'Productor');
    });
  }
  getParcela() {
    this._ParcelaService.getParcelas().subscribe(data => {
      this.parcelas = data
    });
  }
  getRecetas() {
    this._ServiciosService.getRecetas().subscribe((data) => {
      this.recetas = data
    });

  }
  chooseprod(event: any) {
    console.log(event);
    this.secondFormGroup.patchValue({
      ejido: [],
      cultivo: [],
      mun: [],
    })
    this.addEventForm2.patchValue({
      parcela: [],
    })
    this.parcelaFil = []

    this.productores.find(element => {
      console.log(element._id);

      if (element._id == event) {

        this.secondFormGroup.patchValue({
          productor: element.nombre + '' + element.apellidoPa,
          contac: element.telefono
        })
        console.log(this.secondFormGroup.controls['productor'].value);


        this.FormFish.patchValue({ productor: element._id })
        console.log(this.FormFish.value);

      }
    });

    this.parcelaFil = this.parcelas.filter(element => {
      if (element.productor == this.addEventForm2.controls['productor'].value) {

        return element
      }
    });


    //console.log(this.parcelaFil);
  }
  SelectIngeniero() {
    var ingeniero: any = localStorage.getItem('UsuarioLogin');
    //console.log(JSON.parse(ingeniero));
    this.secondFormGroup.patchValue({
      atendio: JSON.parse(ingeniero).nombre,
    })
    this.FormFish.patchValue({ ingeniero: JSON.parse(ingeniero).id })

  }
  submitReceta() {
    if (this.suelos.valid && this.foliares.valid) {

      this.servicioExtArr.push(this._formBuilder.group(this.suelos.value))
      this.servicioExtArr2.push(this._formBuilder.group(this.foliares.value))

      const Receta: Receta = {
        productor: this.FormFish.value.productor,
        ingeniero: this.FormFish.value.ingeniero,
        parcela: this.FormFish.value.parcela,
        fecha: this.date,
        suelos: this.FormFish.value.suelo,
        foliares: this.FormFish.value.foliares,
        nov: this.secondFormGroup.value.novista,
        sup: this.secondFormGroup.value.sup,
      }


      this._ServiciosService.agregarReceta(Receta).subscribe((resp) => {
        console.log("comienzaaaaaaaaaa");
        
        if (this.selection.sta == 'PENDIENTE') {
          let resp1 = JSON.parse(JSON.stringify(resp))
          console.log(resp1.resp._id);
          const status: Agenda = {
            receta: resp1.resp._id
          }
          this._ServiciosService.UpdateReceta(this.selection.id, status).subscribe(data => {
            this.toastr.success('Receta registrada con exito!', 'Receta Realizada', {
              positionClass: 'toast-top-right'
            });
            this.suelos.reset()
            this.foliares.reset()
          }, error => {
            this.toastr.error('Receta NO Actualizada!', 'No se actualizó', {
              positionClass: 'toast-top-right'
            });

          })
        }else{
          this.toastr.success('Receta registrada con exito!', 'Receta Realizada', {
            positionClass: 'toast-top-right'
          });
          this.suelos.reset()
          this.foliares.reset()
        }



      }, error => {
        this.toastr.error('Receta NO registrada!', 'NO SE GUARDÓ', {
          positionClass: 'toast-bottom-right'
        });
      })


      
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al subir la receta',
        text: 'intentelo de neuvo'
      });
    }
  }
  choosepar(event: any) {
    console.log(event);
    this.secondFormGroup.patchValue({ novista:  1})
    this.parcelaFil.find(element => {
      if (element._id == event) {
        //console.log(element);
        this.secondFormGroup.patchValue({
          ejido: element.nombre,
          cultivo: element.cultivo,
          mun: element.cuidad,
        })
        this.FormFish.patchValue({ parcela: element._id })

      }
    });
    this.recetas.filter((element:any) => {
      if(element.parcela == event){
        this.secondFormGroup.patchValue({ novista: element.nov + 1})
      }
      
  });

    //console.log(this.FormFish.value);

  }
  imprimirFrente() {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    /*HOJA POR EL FRENTE*/
    let imgFoo = '../../../assets/imagenes/login/logo-ico.png';
    var marca = '../../../assets/imagenes/login/logo-ico.png';
    var piePagina = '../../../assets/imagenes/login/logo-ico.png'
    let linea2 = '../../../assets/imagenes/login/3.png';
    // let universidad = this.recetMedica.universidad
    //let hora_impresion = hoy.toLocaleDateString()
    const doc: any = new jsPDF({
      unit: "cm",
      format: 'a4',
    });
    doc.addImage(imgFoo, 'PNG', 1, 0.5, 6, 2);
    doc.addImage(linea2, 'PNG', 17, 0.5, 2, 2);
    doc.addImage(marca, 'PNG', 1, 6, 19, 25);
    doc.setFontSize(16);
    doc.setFont('helvetica')
    doc.text('RECETA ICO ORGANICA', 8, 2)
    doc.text('FOLIO: ' + this.secondFormGroup.value.novista, 16, 4)
    doc.setFontSize(12);
    doc.text('FECHA:', 10.5, 5)
    doc.text(`${hoy}`, 12.5, 5)
    doc.text('PRODUCTOR: ', 1, 6.7);
    doc.text(`${this.secondFormGroup.value.productor}`, 3.9, 6.7);
    doc.text('CULTIVO: ', 8.3, 6.7);
    doc.text(`${this.secondFormGroup.value.cultivo}` + '', 10.5, 6.7);
    doc.text('EJIDO:', 1, 7.5)
    doc.text(`${this.secondFormGroup.value.ejido} `, 2.5, 7.5)
    doc.text('SUELO:', 1, 9)
    let a = 9.8;
    let b = 10.2;
    this.FormFish.value.suelo.forEach((element: any, index: number) => {
      this.recetaPDF.height += 1;
      doc.text(1, a, (this.recetaPDF.width, this.recetaPDF.height, (index + 1) + '.-' + `${element.oxisul}`));
      a = a + 1.3;
      this.recetaPDF.height += 1;
      doc.text(1, b, (this.recetaPDF.width, this.recetaPDF.height, `${element.oxisul}`));
      b = b + 1.3;
    });
    doc.text('FOLIARES:', 1, (b + 0.5))
    this.FormFish.value.foliares.forEach((element: any, index: number) => {
      this.recetaPDF.height += 1;
      doc.text(1, a, (this.recetaPDF.width, this.recetaPDF.height, (index + 1) + '.-' + `${element.oxisul}`));
      a = a + 1.3;
      this.recetaPDF.height += 1;
      doc.text(1, b, (this.recetaPDF.width, this.recetaPDF.height, `${element.oxisul}`));
      b = b + 1.3;
    });
    let c = 20.5


    doc.text("ING. AGRONOMO: " + this.secondFormGroup.value.atendio, 7, 24.5);
    doc.text("ESPECIALIDAD: ", 7, 25);
    doc.text("CÉDULA: " + "CEDAS154456314", 7, 25.5);
    /* doc.text("UNIVERSIDAD: ", 8,26); */
    doc.addImage(piePagina, 'PNG', 1, 26.5, 19, 1.4);
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text("Horario: Lunes a Sabado 24 horas", 1, 28.1);
    doc.text("Vicente... Barrio Santa Ana Tlayacapan, Mor.", 1, 28.4);
    doc.text("Tel. (735) 357 7564", 1, 28.7);
    doc.text("atencion@ico.com", 1, 29);
    //doc.output('dataurlnewwindow');
    /* doc.save(this.paciente.nombrePaciente + " " + this.paciente.apellidoPaterno); */
    window.open(doc.output('bloburl', '_blank'));
    Swal.fire({
      icon: 'success',
      title: 'RECETA DESCARGADA',
      text: 'Se guardó la receta exitosamente',

    });
  }

}
