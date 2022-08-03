import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  public id:any = ''
  public existIng:any = false
  public existMas:any = false
 
  constructor(
      private _router: Router, private _authGuard: AuthGuard
     ) { }
 
  ngOnInit(): void {
   this.User()
    this.existIng = this._authGuard.IsIng()
    this.existMas= this._authGuard.IsMaster()
  }
  User(){
    var ingeniero:any = localStorage.getItem('UsuarioLogin');
    this.id = JSON.parse(ingeniero).id 
  }
  ChooseOptins(){
    this._router.navigateByUrl('/agregar-usuarios')
    
  }
  
}
