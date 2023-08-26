import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpandedResultsComponent } from './expanded-results/expanded-results.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path: "extended-city-data/:lat/:lon", component: ExpandedResultsComponent},
  {path: "", component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
