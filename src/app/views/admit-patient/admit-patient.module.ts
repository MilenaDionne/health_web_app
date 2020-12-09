import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AdmitPatientRoutingModule } from './admit-patient-routing.module';
import { AdmitPatientComponent} from './admit-patient.component';


@NgModule({
  declarations: [AdmitPatientComponent],
  imports: [
    CommonModule,
    AdmitPatientRoutingModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ]
})
export class AdmitPatientModule { }