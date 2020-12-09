import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrescriptionComponent} from './prescription.component';
import {PrescriptionRoutingModule} from './prescription-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [PrescriptionComponent],
  imports: [
    CommonModule, PrescriptionRoutingModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule, ReactiveFormsModule,
  ]
})
export class PrescriptionModule { }
