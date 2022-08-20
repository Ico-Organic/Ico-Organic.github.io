import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Modulosangular
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import 'zone.js/plugins/zone-error';
// Componentes
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/productos/listar-productos/listar-productos.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CrearComponent } from './productores/crear/crear.component';
import { VerComponent } from './productores/ver/ver.component';
import { ProductorComponent } from './productores/productor/productor.component';
import { CrearParComponent } from './parcelas/crear-par/crear-par.component';
import { FichaComponent } from './productores/ficha/ficha.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!


import { AgendasComponent } from './agenda/agendas/agendas.component';
import { RecetasComponent } from './recetas/recetas.component';
import { LoginComponent } from './components/login/login.component';
import { FichaLightComponent } from './productores/ficha-light/ficha-light.component';
import { VerParComponent } from './parcelas/ver-par/ver-par.component';
import { FichaParcelaComponent } from './parcelas/ficha-parcela/ficha-parcela.component';
// IMPORTS DE CALENDAR
//import {BrowserAnimationsModuleConfig } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SolicitudComponent } from './agenda/solicitud/solicitud.component';
import { PerfilComponent } from './components/perfil/perfil.component';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ViewParcelasComponent } from './parcelas/view-parcelas/view-parcelas.component';
import { ViewAsesoriasComponent } from './parcelas/view-asesorias/view-asesorias.component';

import { MaterialExampleModule } from 'src/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
FullCalendarModule.registerPlugins([
  interactionPlugin,
  dayGridPlugin
])

@NgModule({
  declarations: [
    CrearProductoComponent,
    ListarProductosComponent,
    AppComponent,
    SpinnerComponent,
    HeaderComponent,
    FooterComponent,
    CrearComponent,
    VerComponent,
    ProductorComponent,
    CrearParComponent,
    FichaComponent,
    AgendasComponent,
    RecetasComponent,
    CrearProductoComponent,
    ListarProductosComponent,
    LoginComponent,
    FichaLightComponent,
    VerParComponent,
    FichaParcelaComponent,
    DashboardComponent,
    SolicitudComponent,
    PerfilComponent,
    ViewParcelasComponent,
    ViewAsesoriasComponent
  ],
  imports: [

    NgxPaginationModule,
    FullCalendarModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MaterialExampleModule, ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
