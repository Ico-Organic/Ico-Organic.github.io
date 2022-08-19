import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ListarProductosComponent } from './components/productos/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';

import { CrearParComponent } from './parcelas/crear-par/crear-par.component';
import { ProductorComponent } from './productores/productor/productor.component';
import { VerComponent } from './productores/ver/ver.component';
import { CrearComponent } from './productores/crear/crear.component';
import { AgendasComponent } from './agenda/agendas/agendas.component';
import { RecetasComponent } from './recetas/recetas.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { masterGuard } from './guards/master.guard';
import { VerParComponent } from './parcelas/ver-par/ver-par.component';
import { SolicitudComponent } from './agenda/solicitud/solicitud.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent ,canActivate: [AuthGuard]   },
  { path: 'usuarios/:id', component: ProductorComponent,canActivate: [AuthGuard] },
  { path: 'perfil/:id', component: PerfilComponent,canActivate: [AuthGuard,masterGuard] },
  { path: 'editar-usuarios/:id', component: CrearComponent,canActivate: [AuthGuard,masterGuard] },
  { path: 'agregar-usuarios', component: CrearComponent,canActivate: [AuthGuard,masterGuard] },
  { path: 'agendar', component: SolicitudComponent,canActivate: [AuthGuard]  },
  { path: 'agendar/:id', component: SolicitudComponent,canActivate: [AuthGuard]  },

  { path: 'ver-usuarios/:tipo', component: VerComponent,canActivate: [AuthGuard] },
  { path: 'crear-parcela/:id', component: CrearParComponent,canActivate: [AuthGuard] },
  { path: 'editar-parcela/:edit', component: CrearParComponent,canActivate: [AuthGuard] },
  { path: 'ver-parcela/:id', component: VerParComponent,canActivate: [AuthGuard] },
  { path: 'receta', component: RecetasComponent,canActivate: [AuthGuard] },
  { path: 'receta/:id', component: RecetasComponent,canActivate: [AuthGuard] },
  { path: 'agenda/:id', component: AgendasComponent,canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'productos', component: ListarProductosComponent,canActivate: [AuthGuard] },

  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'editar-producto/:id', component: CrearProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
