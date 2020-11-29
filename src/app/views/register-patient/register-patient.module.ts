import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPatientRoutingModule } from './register-patient-routing.module';
import { RegisterPatientComponent} from './register-patient.component';


@NgModule({
  declarations: [RegisterPatientComponent],
  imports: [
    CommonModule,
    RegisterPatientRoutingModule
  ]
})
export class RegisterPatientModule { }
