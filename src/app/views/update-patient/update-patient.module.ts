import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePatientComponent } from './update-patient.component';
import {UpdatePatientRoutingModule} from './update-patient-routing.module';



@NgModule({
  declarations: [UpdatePatientComponent],
  imports: [
    CommonModule,
    UpdatePatientRoutingModule
  ]
})
export class UpdatePatientModule { }
