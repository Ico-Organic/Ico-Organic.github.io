import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-productor',
  templateUrl: './productor.component.html',
  styleUrls: ['./productor.component.css']
})
export class ProductorComponent implements OnInit {
  public productor:any = {
    id:"",
  }
public parcelas:any = []
    
    constructor(private activatedRoute: ActivatedRoute,private _ParcelaService: ParcelaService,private router: Router,private _ServiciosService: ServiciosService) { 
  
    }

  ngOnInit(): void {
    this.productor.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getParcelas()
  }
  addPar(){
    console.log(this.productor.id);
    
    this.router.navigate([ `/crear-parcela/${this.productor.id}`]);

  }
  getParcelas() {
    console.log("holis");

    this._ParcelaService.obtenerParcelaById(this.productor.id).subscribe(data => {
      console.log(data);

      this.parcelas = data
    });
  }
}
