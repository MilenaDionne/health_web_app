import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterPatientComponent} from './register-patient.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterPatientRoutingModule { }
