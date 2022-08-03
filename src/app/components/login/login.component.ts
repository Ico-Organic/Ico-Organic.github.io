import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registroForm: FormGroup;
  public exist:any 

    constructor( private _usuariosService: UsuariosService,private toastr: ToastrService, private router: Router, private Auth: AuthGuard
  ) { 
    this.registroForm = new FormGroup({
      correo: new FormControl([], [Validators.email]),
      password: new FormControl([], [Validators.required]),

    })
  }

  ngOnInit(): void {
   this.exist = this.Auth.existelogin() 
   console.log(this.exist);
   
   }
 
  registrarSubmit(){
    console.log(this.registroForm.value);
    
    this._usuariosService.login(this.registroForm.value).subscribe(data => {
      console.log(data);
      localStorage.setItem("UsuarioLogin", JSON.stringify(data.dataUser))
      this.router.navigate(['/home']);
      this.toastr.success( '','BIENVENIDO', {
        positionClass: 'toast-top-right'
      })
      setTimeout((): void => {
        window.location.reload()

      }, 100)
  

     }, error =>{
console.log(error.status);
      if(error.status == 409){
        this.toastr.error( 'Verifica que tu correo sea correcto','Correo incorrecto', {
       positionClass: 'toast-top-right'
     })
      }else if (error.status == 403){
        this.toastr.error('Verifica que tu contraseña sea correcta','Contraseña incorrecta',  {
       positionClass: 'toast-top-right'
     })
     
      }
    
    }
    )
    
  }
  
}
