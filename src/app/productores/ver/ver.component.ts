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
  public exist: any = false;
  public cargando:string ='Cargando datos...'
  public idprod: string = ''
  public abc:
    any = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
  public pagina = 0;
  config: any;
  config2: any;

  constructor(private activatedRoute: ActivatedRoute, private _AuthGuard: AuthGuard, private _usuariosService: UsuariosService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {

    this.config = {
      id: 'basicPaginate',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.productoresSelec.length
    };
    this.config2 = {
      id: 'basicPaginate21',
      itemsPerPage: 10,
      currentPage: 1,
      nextLabel:'>sadsad',
      previousLabel:'dsada',
      totalItems: this.abcarr.length
    };
  }
  public productores: any[] = [];
  public productoresSelec: any[] = [];
  public productoresHis: any[] = [];
  public abcarr: any[] = [];

  ngOnInit(): void {
    this.getlis()
    this.exist = this._AuthGuard.IsMaster()
    console.log(this.exist);
    console.log("asdsadsadsadsadsads");

      this.abcarr = Array.from(this.abc)

    console.log(this.abcarr);
    

  }
  Search(event:any){
    console.log(event);
    if (event.length != 0) {
      if (event.length > 3) {
        const nameFilter = this.buscarPerson(event);
        //  //console.log( nameFilter )
        this.productoresSelec = nameFilter;

        event = "";
      }
    } else {
      this.productoresSelec = this.productoresHis;

    }
  }
  buscarPerson(event:any) {
    const pacientesFilter:any = [];

    this.productoresHis.forEach(element => {
        let nombreCompleto = element.nombre.trim().replace(/^\s+|\s+$|\s+(?=\s)/g, "").concat(" "+ element.apellidoPa.trim().replace(/^\s+|\s+$|\s+(?=\s)/g, "")+" "+element.apellidoMa.trim().replace(/^\s+|\s+$|\s+(?=\s)/g, ""));
        if(nombreCompleto.toUpperCase().includes(event.trim().replace(/^\s+|\s+$|\s+(?=\s)/g, "").toUpperCase())){
            pacientesFilter.push(element);
        }else{
          this.cargando = 'No hay resultados con ese nombre'
        }
    });
    return pacientesFilter;
}

  selecLetter(event:any) {
    console.log(event);
    
    this.productoresSelec = this.productoresHis.filter(
      (person: any) => {
        if (person.nombre.charAt(0).toLocaleUpperCase() == event.toLocaleUpperCase()) {

          return person

        }else{
          this.cargando = 'No hay datos con esa incial'
          return
        }
      }

    );
    console.log(this.productoresSelec);


  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  pageChanged1(event: any) {
    this.config2.currentPage = event;
  }
  SelectType() {
    this.tipo = this.route.snapshot.paramMap.get('tipo')

    if (this.tipo == 'productores') {
      this.productores.filter(element => {
        if (element.rol == 'Productor') {
           this.productoresSelec.push(element)
           return this.productoresHis = this.productoresSelec
        }
        return
      });

    } else if (this.tipo == 'ingenieros') {
      this.productores.filter(element => {
        if (element.rol == 'Ingeniero') {
          this.productoresSelec.push(element)
          return this.productoresHis = this.productoresSelec
        }
        return
      })
    } 
  }
  getlis() {
    console.log("holis");
    let user: any = JSON.parse(localStorage.getItem('UsuarioLogin')!).id
    this._usuariosService.getUsuarios().subscribe(data => {
      data.forEach((element: any) => {
        if (element._id != user) {
          this.productores.push(element)
          console.log(this.productores);


        };

      });

    }, error => {
      console.log(error);
    })
    setTimeout((): void => {
      this.SelectType()
    }, 1000);
  }
  ChoosePac(event: any) {

    if (this.exist == true) {
      this.router.navigate([`/perfil/${event}`]);
    } else {
      this.router.navigate([`/usuarios/${event}`]);

    }

  }
}
