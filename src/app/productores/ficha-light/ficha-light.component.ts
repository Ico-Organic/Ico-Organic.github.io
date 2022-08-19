import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ficha-light',
  templateUrl: './ficha-light.component.html',
  styleUrls: ['./ficha-light.component.css']
})
export class FichaLightComponent implements OnInit {
  public productor:any = {
    id:"",
    nombre:"",
    apellidoMa:"",
    apellidoPa:"",
    telefono:"",
    correo:"",
    habilitado:"",
    rol:"",
  }

  constructor(private activatedRoute: ActivatedRoute,private _UsuariosService: UsuariosService,private router: Router) { }

  ngOnInit(): void {
    this.productor.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetUser()
  }
  GetUser(){
   
    this._UsuariosService.obtenerUsuario(this.productor.id).subscribe(data => {
      
      console.log(data);
      
      
      this.productor = {
        id: data._id,
        nombre: data.nombre,
        apellidoMa: data.apellidoMa,
        apellidoPa: data.apellidoPa,
        telefono: data.telefono,
        correo: data.correo,
        habilitado: data.habilitado,
        rol: data.rol,
        }
        
    })
  }
}
