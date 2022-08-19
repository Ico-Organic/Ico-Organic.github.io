import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormBuilder,
  NgForm,
  Validators,
} from "@angular/forms";
import { UsuariosService } from "src/app/services/usuarios.service";
import { ParcelaService } from "src/app/services/parcela.service";
import { ServiciosService } from "src/app/services/servicios.service";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import { ToastrService } from "ngx-toastr";
import { Receta } from "../models/receta";
import { ActivatedRoute } from "@angular/router";
import { Agenda } from "../models/Agenda";
import * as $ from "jquery";
import { RecetaPdf } from "../utils/recetaPDF";
import { AuthGuard } from "../guards/auth.guard";

@Component({
  selector: "app-recetas",
  templateUrl: "./recetas.component.html",
  styleUrls: ["./recetas.component.css"],
})
export class RecetasComponent implements OnInit {
  @ViewChild("registroForm") registroNgForm: any = NgForm;
  secondFormGroup: FormGroup;
  addEventForm2: any = FormGroup;
  suelos: FormGroup;
  foliares: FormGroup;
  public id: any = "";
  public sincon:Boolean = false;
  FormFish: FormGroup;
  public recetaPDF = {
    height: 3.7,
    width: 1.5,
    whithEspacio: 3.4,
  };
  public recetas: any = [];
  public productores: any[] = [];
  public parcelas: any[] = [];
  public parcelaFil: any[] = [];
  public date = new Date();

  public form: any = {
    atendio: "",
    productor: "",
    cultivo: "",
    ejido: "",
    novista: "",
    sup: "",
    mun: "",
    cont: "",
  };
  selection: any;
  constructor(
    private auth: AuthGuard,
    private _UsuariosService: UsuariosService,
    private route: ActivatedRoute,
    private _ServiciosService: ServiciosService,
    private _ParcelaService: ParcelaService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.secondFormGroup = new FormGroup({
      atendio: new FormControl([], [Validators.required]),
      productor: new FormControl([], [Validators.required]),
      ejido: new FormControl([], [Validators.required]),
      novista: new FormControl(1, [Validators.required]),
      sup: new FormControl("SUP...", [Validators.required]),
      cultivo: new FormControl([], [Validators.required]),
      mun: new FormControl([], [Validators.required]),
      contac: new FormControl([], [Validators.required]),
    });
    this.addEventForm2 = new FormGroup({
      productor: new FormControl([], Validators.required),
      parcela: new FormControl([], Validators.required),
    });
    this.FormFish = new FormGroup({
      ingeniero: new FormControl([], [Validators.required]),
      productor: new FormControl([], [Validators.required]),
      parcela: new FormControl([], [Validators.required]),
      suelo: this._formBuilder.array([]),
      foliares: this._formBuilder.array([]),
    });
    this.suelos = this._formBuilder.group({
      oxisul: new FormControl([], [Validators.required]),
      enraizadorsul: new FormControl(
        [],
        [Validators.required]
      ),
      vegetativosul: new FormControl(
        [],
        [Validators.required]
      ),
      floracionsul: new FormControl(
        [],
        [Validators.required]
      ),
      engordesul: new FormControl(
        [],
        [Validators.required]
      ),
    });
    this.foliares = this._formBuilder.group({
      oxifol: new FormControl([], [Validators.required]),
      enraizadorfol: new FormControl(
        [],
        [Validators.required]
      ),
      vegetativofol: new FormControl(
        [],
        [Validators.required]
      ),
      floracionfol: new FormControl(
        [],
        [Validators.required]
      ),
      engordefol: new FormControl(
        [],
        [Validators.required]
      ),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.SelectIngeniero();
    this.secondFormGroup.disable();
    this.getlis();
    this.getParcela();
    this.getRecetas();

    this.ExisteUsuarios();
  }

  ExisteUsuarios() {
    if (this.id!) {
      this._ServiciosService.SelectCita$.subscribe(
        (agenda: Agenda) => (this.selection = agenda)
      );
      console.log("SELECET STATUUUUUUUUUUUUUUUUUUUS");

      console.log(this.selection);

      this.addEventForm2.patchValue({
        productor: this.selection.productor,
        parcela: this.id,
      });

      console.log(this.addEventForm2.value);
      setTimeout(() => {
        this.chooseprod(this.addEventForm2.value.productor);
      }, 1000);
      setTimeout(() => {
        this.choosepar(this.id);
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
    this._UsuariosService.getUsuarios().subscribe((data) => {
      console.log(data);

      this.productores = data;
      this.productores = this.productores.filter(
        (element) => element.rol == "Productor"
      );
    });
  }
  getParcela() {
    this._ParcelaService.getParcelas().subscribe((data) => {
      this.parcelas = data;
    });
  }
  getRecetas() {
    this._ServiciosService.getRecetas().subscribe((data) => {
      this.recetas = data;
    });
  }
  InputValue(){
    this.secondFormGroup.patchValue({
      ejido: [],
      cultivo: [],
      mun: [],
    });
  }
  InputValue2(){
    this.secondFormGroup.patchValue({
      productor:[],
      contac: [],
    });
  }
  chooseprod(event: any) {
    if(event != ''){
      console.log(event);
      this.InputValue()
      this.addEventForm2.patchValue({
        parcela: [],
      });
      this.parcelaFil = [];
  
      this.productores.find((element) => {
        console.log(element._id);
  
        if (element._id == event) {
          this.secondFormGroup.patchValue({
            productor: element.nombre + "" + element.apellidoPa,
            contac: element.telefono,
          });
          console.log(this.secondFormGroup.controls["productor"].value);
  
          this.FormFish.patchValue({ productor: element._id });
          console.log(this.FormFish.value);
        }
      });
  
      this.parcelaFil = this.parcelas.filter((element) => {
        if (element.productor == this.addEventForm2.controls["productor"].value) {
          return element;
        }
      });
    }else{
      this.InputValue()
      this.InputValue2()

    }
    

    //console.log(this.parcelaFil);
  }
  SelectIngeniero() {
    var ingeniero: any = localStorage.getItem("UsuarioLogin");
    //console.log(JSON.parse(ingeniero));
    this.secondFormGroup.patchValue({
      atendio: JSON.parse(ingeniero).nombre,
    });
    this.FormFish.patchValue({ ingeniero: JSON.parse(ingeniero).id });
  }
  submitReceta() {


    

    if (this.suelos.valid && this.foliares.valid && this.FormFish.valid && this.addEventForm2.valid) {
      const Receta: Receta = {
        productor: this.FormFish.value.productor,
        ingeniero: this.FormFish.value.ingeniero,
        parcela: this.FormFish.value.parcela,
        fecha: this.date,
        suelos: this.FormFish.value.suelo,
        foliares: this.FormFish.value.foliares,
        nov: this.secondFormGroup.value.novista,
        sup: this.secondFormGroup.value.sup,
      };

      this.servicioExtArr.push(this._formBuilder.group(this.suelos.value));
      this.servicioExtArr2.push(this._formBuilder.group(this.foliares.value));

      this.CrearPdf();
      console.log("-------------- comienza el pdf 11111111111111");

      this._ServiciosService.agregarReceta(Receta).subscribe(
        (resp) => {
          console.log("comienzaaaaaaaaaa");
          if(this.selection!){
          if (this.selection.sta == "PENDIENTE") {
            let resp1 = JSON.parse(JSON.stringify(resp));
            console.log(resp1.resp._id);
            const status: Agenda = {
              receta: resp1.resp._id,
            };
            this._ServiciosService
              .UpdateReceta(this.selection.id, status)
              .subscribe(
                (data) => {
                  this.toastr.success(
                    "Receta registrada con exito!",
                    "Receta Realizada",
                    {
                      positionClass: "toast-top-right",
                    }
                  );
                  this.suelos.reset();
                  this.addEventForm2.reset();
                  this.ResetForm()
                  this.foliares.reset();
                },
                (error) => {
                  this.toastr.error(
                    "Receta NO Actualizada!",
                    "No se actualizó",
                    {
                      positionClass: "toast-top-right",
                    }
                  );
                }
              );
          }
           } else {
            this.toastr.success(
              "Receta registrada con exito!",
              "Receta Realizada",
              {
                positionClass: "toast-top-right",
              }
            );
            this.suelos.reset();
            this.addEventForm2.reset();
            this.ResetForm()

            this.foliares.reset();
          }
        




        },
        (error) => {
          this.toastr.error("Receta NO registrada!", "NO SE GUARDÓ", {
            positionClass: "toast-top-right",
          });
        }
      );
    } else {
      console.log("-------------- comienza el pdf");
      
      if(this.sincon == true){
        console.log(this.suelos);
        console.log(this.foliares);
        console.log(this.secondFormGroup);
        this.servicioExtArr.push(this._formBuilder.group(this.suelos.value));
        this.servicioExtArr2.push(this._formBuilder.group(this.foliares.value));
        
        if (this.suelos.valid && this.foliares.valid && this.secondFormGroup.valid) {
          this.CrearPdf();
          this.suelos.reset();
          this.addEventForm2.reset();
          this.ResetForm()
          this.foliares.reset();
         
        }else{
          this.toastr.error("faltan campos por rellenar!", "Termina el fomulario", {
            positionClass: "toast-top-right",
          });
        }
        
      }else{
        Swal.fire({
          icon: "error",
          title: "Error al subir la receta",
          text: "intentelo de neuvo",
        });
      }
      
    }
  }
  SinRegistro(){
          if(this.sincon == true){
            
            
            return this.sincon = false

          }else if(this.sincon == false){

            this.secondFormGroup.enable();
            console.log(this.secondFormGroup);
            
            this.FormFish.patchValue({
              productor:[],
              parcela: [],
            })
            this.ResetForm()
            this.addEventForm2.reset()
            return this.sincon = true
          }
          return 
  }
  ResetForm(){
    this.secondFormGroup.patchValue({
      productor: [],
      cultivo:[],
      ejido:[],
      contac:[],
      mun: []
    })
  }
  CrearPdf() {
    let obj = this.auth.IsIDOj();

    const Receta2: any = {
      productor: this.secondFormGroup.value.productor,
      ingeniero: this.secondFormGroup.value.atendio,
      cultivo: this.secondFormGroup.value.cultivo,
      cuidad: this.secondFormGroup.value.mun,
      contacto: this.secondFormGroup.value.contac,
      ejido: this.secondFormGroup.value.ejido,
      suelos: this.FormFish.value.suelo,
      foliares: this.FormFish.value.foliares,
      novista: this.secondFormGroup.value.novista,
      correo: obj.correo,
      telefono: obj.telefono,
    };

    RecetaPdf(Receta2);
  }
  choosepar(event: any) {

    if(event != ''){
      console.log(event);
      this.secondFormGroup.patchValue({ novista: 1 });
      this.parcelaFil.find((element) => {
        if (element._id == event) {
          //console.log(element);
          this.secondFormGroup.patchValue({
            ejido: element.nombre,
            cultivo: element.cultivo,
            mun: element.cuidad,
          });
          this.FormFish.patchValue({ parcela: element._id });
        }
      });
      console.log("ids --------------------------");
      console.log(this.FormFish.value.ingeniero);
  
      this.recetas.filter((element: any) => {
        if (element.parcela == event) {
          console.log(element);
          
          if (element.ingeniero == this.FormFish.value.ingeniero) {
            this.secondFormGroup.patchValue({ novista: element.nov + 1 });
          }
        }
      });
    }else{
      this.InputValue()
    }
 

    //console.log(this.FormFish.value);
  }
  imprimirFrente() {
    //const nameFilter = RecetaPdf(this.);
  }
}
