import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';
import {FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parcela} from '../../models/Parcela';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-crear-par',
  templateUrl: './crear-par.component.html',
  styleUrls: ['./crear-par.component.css']
})
export class CrearParComponent implements OnInit {

  options: string[] = ['Aguacate', 'Jitomate', 'pepino', 'Maiz','Limon']
  filteredOptions:  Observable<string[]> | undefined

  public parcela: any = {
    id: "",
    nombre: "",
    medidas: "",
    estado: "",
    productor: "",
    cultivo: "",
    cuidad: "",
    colonia: "",
    calle: "",
    rendimiento: "",
    fecha: "",
  }
  mostrarContrasena: boolean = false;
  registroForm: FormGroup;
  paso = false;
  public id:any = ''
  public idpar:any = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _parcelaService : ParcelaService,private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
    ) {
    this.registroForm = new FormGroup({
      nombre: new FormControl([], [Validators.required, Validators.minLength(4)]),
      medidas: new FormControl([], [Validators.required, Validators.minLength(4)]),
      rendimiento: new FormControl([], [Validators.required, Validators.minLength(4)]),
      cultivo: new FormControl([], [Validators.required]),
      calle: new FormControl([], [Validators.required]),
      colonia: new FormControl([], [Validators.required]),
      cuidad: new FormControl([], [Validators.required]),
      estado: new FormControl([], [Validators.required]),
    
    })
  }
  ngOnInit(): void {
    this.filteredOptions = this.registroForm.controls['cultivo'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    
    this.id = this.route.snapshot.paramMap.get('id')
    this.ShowDateParcela()
  }
  
  ShowDateParcela(){
    this.idpar = this.route.snapshot.paramMap.get('edit')
    if(this.idpar!){
      this.GetUser()
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
 
  GetUser() {
    this._parcelaService.obtenerParcelaId(this.idpar).subscribe(data => {
      console.log(data);
      this.registroForm.patchValue({
        id: data._id,
        nombre: data.nombre,
        medidas: data.medidas,
        estado: data.estado,
        productor: data.productor,
        cultivo: data.cultivo,
        cuidad: data.cuidad,
        colonia: data.colonia,
        calle: data.calle,
        rendimiento: data.rendimiento,
        fecha: data.fecha
      })
    })
  }

  registrarSubmit(){
    const Parcela: Parcela = {
      nombre: this.registroForm.value.nombre,
      productor: this.id,
      medidas: this.registroForm.value.medidas,
      rendimiento: this.registroForm.value.rendimiento,
      cultivo: this.registroForm.value.cultivo,
      calle: this.registroForm.value.calle,
      colonia: this.registroForm.value.colonia,
      cuidad: this.registroForm.value.cuidad,
      estado:this.registroForm.value.estado
    }

    console.log(this.registroForm.value);
    console.log(this.id);
    if (this.registroForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'FALTAN CAMPOS',
        text: 'Rellene todos los campos',

      });
    }else{
      if(this.idpar!){
        this._parcelaService.UpdateParcela(this.idpar,Parcela).subscribe(data => {
          this.toastr.success('La parcela se cambió exitosamente!', 'Parcela Actualizada', {
            positionClass: 'toast-top-right'
          });
       
          this.router.navigate(['ver-parcela/',this.idpar]);

        }, error => {
          this.toastr.error('Revise su conexión a internet!', 'Parcela no Actualizada', {
            positionClass: 'toast-top-right'
          });
        })

      }else{

        this._parcelaService.agregarParcela(Parcela).subscribe(data => {
          this.toastr.success('La parcela se agregó exitosamente!', 'Parcela Registrada', {
            positionClass: 'toast-top-right'
          });
         
          this.router.navigate(['/perfil/',this.id]);

        }, error => {
          this.toastr.error('Revise su conexión a internet!', 'Parcela no registrada', {
            positionClass: 'toast-top-right'
          });
        })
      
        
      }
  
    }
    
    
  }

 
}
