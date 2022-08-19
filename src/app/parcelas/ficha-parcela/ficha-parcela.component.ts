import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';

@Component({
  selector: 'app-ficha-parcela',
  templateUrl: './ficha-parcela.component.html',
  styleUrls: ['./ficha-parcela.component.css']
})
export class FichaParcelaComponent implements OnInit {
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

  constructor(private activatedRoute: ActivatedRoute, private _ParcelaService: ParcelaService, private router: Router) { }

  ngOnInit(): void {
    this.parcela.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetUser()
  }
  GetUser() {
    this._ParcelaService.obtenerParcelaId(this.parcela.id).subscribe(data => {
      console.log(data);
      this.parcela = {
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
      }

    })
  }
}
