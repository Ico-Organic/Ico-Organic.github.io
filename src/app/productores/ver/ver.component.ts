import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})

export class VerComponent implements OnInit {
  public tipo: any;
  public exist:any = false;
  public idprod: string = ''
  public pagina = 0;
  config: any;

  constructor(private activatedRoute: ActivatedRoute, private _AuthGuard: AuthGuard, private _usuariosService: UsuariosService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { 
   
    this.config = {
      id: 'basicPaginate',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.productoresSelec.length
    };

  }
  public productores: any[] = [];
  public productoresSelec: any[] = [];

  ngOnInit(): void {
    this.getlis()
    this.exist = this._AuthGuard.IsMaster()
    console.log(this.exist);
    

  }

 
  pageChanged(event:any) {
    this.config.currentPage = event;
  }

  SelectType() {
    this.tipo = this.route.snapshot.paramMap.get('tipo')

    if (this.tipo == 'productores') {
      this.productores.filter(element => {
        if (element.rol == 'Productor') {
          return this.productoresSelec.push(element)
        }
        return
      });

    } else if (this.tipo == 'ingenieros') {
      this.productores.filter(element => {
        if (element.rol == 'Ingeniero') {
          console.log(element);
         return  this.productoresSelec.push(element)
        }
        return
      })
    } else {
      this.tipo = 'SELECCIONA LOS USUARIOS'
    }
  }
  getlis() {
    console.log("holis");
    let user:any = JSON.parse(localStorage.getItem('UsuarioLogin')!).id
    this._usuariosService.getUsuarios().subscribe(data => {
      data.forEach((element:any) => {
        if(element._id != user){ 
          this.productores.push(element )
        }
      });
        
    }, error => {
      console.log(error);
    })
    setTimeout((): void => {
      this.SelectType()
    }, 1000);
  }
  ChoosePac(event: any) {

    if(this.exist == true){
      this.router.navigate([`/perfil/${event}`]);
    }else{
      this.router.navigate([`/usuarios/${event}`]);

    }

  }
}
