import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultPatientRoutingModule } from './consult-patient-routing.module';
import { ConsultPatientComponent } from './consult-patient.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ConsultPatientComponent],
  imports: [
    CommonModule,
    ConsultPatientRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
  ]
})
export class ConsultPatientModule { }
