import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../../models/usuarios';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  public productor: any = {
    id: "",
  }

   hide = true;
   hide2 = true;
  mostrarContrasena: boolean = false;
  registroForm: FormGroup;
  FormPass: FormGroup;
  paso = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _UsuariosService: UsuariosService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.registroForm = new FormGroup({
      nombre: new FormControl([], [Validators.required, Validators.minLength(4)]),
      apellidoPa: new FormControl([], [Validators.required, Validators.minLength(4)]),
      apellidoMa: new FormControl([], [Validators.required, Validators.minLength(4)]),
      rol: new FormControl([], [Validators.required]),
      correo: new FormControl([], [Validators.required, Validators.email]),
      password: new FormControl([], [Validators.required, Validators.minLength(6)]),
      telefono: new FormControl([], [Validators.minLength(10),Validators.maxLength(10),Validators.required]),
      status: new FormControl(["HABILITADO"],[Validators.required]),

    })
    this.FormPass = new FormGroup({
      pass1: new FormControl([], [Validators.required, Validators.minLength(6)]),
      pass2: new FormControl([], [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
    this.UpdateUser()
  }
 pass(){
  this.hide2 = !this.hide2
 }
  UpdateUser() {
    this.productor.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.productor.id!) {
      this._UsuariosService.obtenerUsuario(this.productor.id).subscribe(data => {
        console.log(data);
        this.registroForm.patchValue({
          nombre: data.nombre,
          apellidoPa: data.apellidoPa,
          apellidoMa: data.apellidoMa,
          rol: data.rol,
          correo: data.correo,
          password: data.password,
          telefono: data.telefono,
          status: data.status
        })
      }, error => {
        console.log(error);
      })

    }
  }
  
  hiden2(){
    return this.hide = !this.hide
  }
  registrarSubmit() {

    if (this.registroForm.invalid!) {
      return
    } else {
      if(this.productor.id!){
        console.log("act");
        
        this.ActualizarEmpleado()
      }else{
        this.agregarEmpleado()

      }
    }
  }
  FormPassSubmit(){
   
    if(this.FormPass.value.pass1 != ''){
      if(this.FormPass.value.pass1 == this.FormPass.value.pass2){
        if (this.FormPass.invalid!) {
          return
        } else {
          if(this.productor.id!){
            this.ActualizarPassword()
          }
        }
      }else{
        this.toastr.error('No coiciden las contraseñas', 'Contraseñas incorrectas', {
          positionClass: 'toast-top-right'
        });
        

      } 

    }
    
  
  }
  agregarEmpleado() {

    const Usuario: Usuarios = {
      nombre: this.registroForm.value.nombre,
      apellidoPa: this.registroForm.value.apellidoPa,
      apellidoMa: this.registroForm.value.apellidoMa,
      rol: this.registroForm.value.rol,
      correo: this.registroForm.value.correo,
      password: this.registroForm.value.password,
      telefono: this.registroForm.value.telefono,
      status: 'HABILITADO'
    }
    this._UsuariosService.guardarUsuario(Usuario).subscribe(data => {
      this.toastr.success('El Usuario fue registrado con exito!', 'Usuario Registrado', {
        positionClass: 'toast-top-right'
      });
  
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    })
  }
  ActualizarEmpleado() {
    
    const UsuarioUp: Usuarios = {
      nombre: this.registroForm.value.nombre,
      apellidoPa: this.registroForm.value.apellidoPa,
      apellidoMa: this.registroForm.value.apellidoMa,
      rol: this.registroForm.value.rol,
      correo: this.registroForm.value.correo,
      telefono: this.registroForm.value.telefono,
      status: this.registroForm.value.status
    }
    console.log(UsuarioUp);
    
    this._UsuariosService.UpdateUsuario(this.productor.id,UsuarioUp).subscribe(data => {
      console.log(data);
      
      this.toastr.success('El Usuario fue Actualizado con exito!', 'Usuario Actualizado', {
        positionClass: 'toast-top-right'
      });

      this.router.navigate(['/usuarios/',this.productor.id]);
    }, error => {
      console.log(error);
    })
  }
  ActualizarPassword() {
    
    const UsuarioPs: Usuarios = {
      password: this.FormPass.value.pass2,
    }

    console.log(UsuarioPs);
    
    this._UsuariosService.UpdatePassword(this.productor.id,UsuarioPs).subscribe(data => {
      
      this.toastr.success('Contraseña se cambió exitosamente!', 'Contraseña Actualizada', {
        positionClass: 'toast-top-right'
      });
        localStorage.removeItem('UsuarioLogin')
        this.router.navigate(['/login'])

        setTimeout((): void => {
          window.location.reload()

        }, 500)

      this.router.navigate(['/usuarios/',this.productor.id]);
    }, error => {
      
      this.toastr.error('Contraseña no se cambió!', 'Contraseña no actualizada', {
        positionClass: 'toast-top-right'
      });
    })
  }
}
