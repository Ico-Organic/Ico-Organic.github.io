import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Parcela } from 'src/app/models/Parcela';
import { Receta } from 'src/app/models/receta';
import { ParcelaService } from 'src/app/services/parcela.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-ver-par',
  templateUrl: './ver-par.component.html',
  styleUrls: ['./ver-par.component.css'],
})
export class VerParComponent implements OnInit {
  public id: any = ''
  public exist: Boolean = true
  public iduser: any = ''
  public existIng: Boolean = true
  public pagina = 0;
  config: any;
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

  constructor(private _Auth: AuthGuard,private router: Router,private _UsuariosService: UsuariosService, private route: ActivatedRoute, private _ParcelaService: ParcelaService, private _ServiciosService: ServiciosService) {
   
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getParcela()
    this.exist = this._Auth.IsMaster()
    this.existIng = this._Auth.IsIng()
    console.log(this.exist);
    
  }
 
  getParcela() {

    this._ParcelaService.obtenerParcelaId(this.id).subscribe(data => {
      console.log("aqui hay servicios");

      console.log(data.productor._id);
     
 
      this.productor = {
        id: data.productor._id,
        nombre: data.productor.nombre,
        apellidoMa: data.productor.apellidoMa,
        apellidoPa: data.productor.apellidoPa,
        telefono: data.productor.telefono,
        correo: data.productor.correo,
        habilitado: data.productor.habilitado,
        rol: data.productor.rol,
        }
    });
    
  }
 

  pageChanged(event: any) {
    this.config.currentPage = event;

  }
  DarAsesoria(){
    

    //  this.route.navigate(['/receta/', this.idpar ]);
  
        const agenda: Receta ={
          productor:this.productor.id,
          sta:'REGISTRO',
          id: undefined
       }
       console.log(agenda);
       
       this._ServiciosService.setAgenda(agenda)
       this.router.navigate([`/receta/${this.id}`]);
    
    }
}
