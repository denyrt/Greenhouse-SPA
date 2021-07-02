import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './widgets/header/header.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './widgets/login/login.component';
import { RegistryComponent } from './widgets/registry/registry.component';
import { ChartsModule, MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateGreenhouseDialogComponent } from './dialogs/create-greenhouse-dialog/createGreenhouseDialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_URL } from './app-injections-tokens';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN } from 'src/services/api/identity.service';
import { JwtInterceptor } from 'src/interceptors/JwtInterceptor';
import { ErrorInterceptor } from 'src/interceptors/ErrorInterceptor';
import { TemperatureControllersTableComponent } from './widgets/temperature-controllers-table/temperature-controllers-table.component';
import { LightingControllersTableComponent } from './widgets/lighting-controllers-table/lighting-controllers-table.component';
import { WetControllersTableComponent } from './widgets/wet-controllers-table/wet-controllers-table.component';
import { UpdateGreenhouseDialogComponent } from './dialogs/update-greenhouse-dialog/update-greenhouse-dialog.component';
import { RangeValidator } from 'src/validators/RangeValidator';
import { TemperatureDialogComponent } from './dialogs/temperature-dialog/temperature-dialog.component';
import { LightDialogComponent } from './dialogs/light-dialog/light-dialog.component';
import { WetDialogComponent } from './dialogs/wet-dialog/wet-dialog.component';
import { GreenhouseControllersDialogComponent, MapValueFilterPipe } from './dialogs/greenhouse-controllers-dialog/greenhouse-controllers-dialog.component';
import { ReportsDataFormComponent } from './widgets/reports-data-form/reports-data-form.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN);
}

@NgModule({
  declarations: [						
      routingComponents,
      AppComponent,
      HeaderComponent,
      FooterComponent,
      LoginComponent,
      RegistryComponent,
      
      CreateGreenhouseDialogComponent,
      UpdateGreenhouseDialogComponent,
      TemperatureDialogComponent,
      LightDialogComponent,
      WetDialogComponent,
      GreenhouseControllersDialogComponent,

      TemperatureControllersTableComponent,
      LightingControllersTableComponent,
      WetControllersTableComponent,
      RangeValidator,
      MapValueFilterPipe,
      ReportsDataFormComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatCommonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    ClipboardModule,

    ChartsModule,
    WavesModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.apiDomain
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
