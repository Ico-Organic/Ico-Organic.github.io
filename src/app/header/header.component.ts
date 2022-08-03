import { AfterViewInit,Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public exist:any
  public user:any={
    nom:"",
    id:""
  }
  constructor(private router: Router,private _AuthGuard: AuthGuard) { 
  }

  ngOnInit(): void {
    this.exist = this._AuthGuard.existelogin() 
    this.Bienvenido()
  }
  logOut() {
    localStorage.removeItem('UsuarioLogin')
    this.router.navigate(['/login'])

    window.location.reload()
  }
  Bienvenido(){
    this.user = []
    if(localStorage.getItem('UsuarioLogin')!){
      var ingeniero:any = localStorage.getItem('UsuarioLogin');
      this.user.nom = JSON.parse(ingeniero).nombre
      console.log(JSON.parse(ingeniero).id);
      
      this.user.id = JSON.parse(ingeniero).id
  
    }

  }
  ngAfterViewInit(){

  }
}
