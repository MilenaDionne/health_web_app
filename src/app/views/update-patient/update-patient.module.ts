import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePatientComponent } from './update-patient.component';
import {UpdatePatientRoutingModule} from './update-patient-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [UpdatePatientComponent],
  imports: [
    CommonModule,
    UpdatePatientRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class UpdatePatientModule { }
