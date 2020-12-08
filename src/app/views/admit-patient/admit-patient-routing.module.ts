import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitPatientComponent } from './admit-patient.component';

const routes: Routes = [
  {
    path: '',
    component: AdmitPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmitPatientRoutingModule { }
