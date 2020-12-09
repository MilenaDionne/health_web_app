import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultPatientComponent } from './consult-patient.component';

const routes: Routes = [
{
    path: '',
    component: ConsultPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultPatientRoutingModule { }
