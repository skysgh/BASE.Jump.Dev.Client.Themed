// Import Ag:
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Common:
// ...
// Import App:
// ...
// Import Module:
import { SpikesSpikeBrowseComponent } from './ui/browse/component';
import { SpikesSpikeReadComponent } from "./ui/read/component";
import { SpikesSpikeEditComponent } from './ui/edit/component';
import { SpikesSpikeRouteComponent } from './ui/_route/component';

const routes: Routes = [
  {
    path: 'spike',
    component: SpikesSpikeRouteComponent,
    children: [
      { path: 'browse', component: SpikesSpikeBrowseComponent },
      { path: 'view/:id', component: SpikesSpikeReadComponent },
      { path: 'edit/:id', component: SpikesSpikeEditComponent },
      { path: '', redirectTo: 'browse', pathMatch: 'prefix' }
    ]
    },
  { path: '', redirectTo: 'spike', pathMatch: 'prefix' }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SpikesSpikeRoutingModule { }
