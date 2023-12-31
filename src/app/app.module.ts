import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { ExpandedResultsComponent } from './expanded-results/expanded-results.component';
import { GraphsComponent } from './graphs/graphs.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericTableComponent } from './generic-table/generic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ExpandedResultsComponent,
    GraphsComponent,
    GenericTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
