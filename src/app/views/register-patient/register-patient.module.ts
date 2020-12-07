import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPatientRoutingModule } from './register-patient-routing.module';
import { RegisterPatientComponent} from './register-patient.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RegisterPatientComponent],
  imports: [
    CommonModule,
    RegisterPatientRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class RegisterPatientModule { }
