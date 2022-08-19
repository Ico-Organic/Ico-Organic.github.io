import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ParcelaService } from 'src/app/services/parcela.service';
ActivatedRoute
@Component({
  selector: 'app-view-parcelas',
  templateUrl: './view-parcelas.component.html',
  styleUrls: ['./view-parcelas.component.css']
})
export class ViewParcelasComponent implements OnInit {
  public user: any = ''
  public existIng: any = ''
  public existIng2: Boolean = false
  public existMas: Boolean = false
  public productores: any = []
  config2: any
  constructor(private _ParcelaService: ParcelaService, private activatedRoute: ActivatedRoute, private route: Router, private _AuthGuard: AuthGuard) {
    this.PaginateIndex()
  }

  ngOnInit(): void {

    this.user = this.activatedRoute.snapshot.paramMap.get('id');
    this.getParcelas()

    this.existMas = this._AuthGuard.IsMasterCount()
    console.log(this.existMas);
    
    this.existIng2 = this._AuthGuard.IsIng()
    console.log(this.existIng2);
    
  }

  getParcelas() {
    console.log("holis");

    this._ParcelaService.obtenerParcelaById(this.user).subscribe(data => {
      console.log(data);
      //this.exist = data.productor.rol
      console.log(data);
      data.find((element: any) => {
        this.existIng = element.productor.rol
      }
      );
      console.log(this.existIng);
      

      this.productores = data
    },error =>{
        console.log("NO HAY DATAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        
    });
  }
  SelectParc(event: any) {
    console.log(event);
    this.route.navigate([`/ver-parcela/${event._id}`]);
  }
  PaginateIndex() {

    this.config2 = {
      id: 'basicPaginate2',
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.productores.length
    };
  }
  pageChanged2(event: any) {
    this.config2.currentPage = event;
  }
   
}
