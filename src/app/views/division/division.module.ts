import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DivisionComponent} from './division.component';
import {DivisionRoutingModule} from './division-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [DivisionComponent],
  imports: [
    CommonModule,
    DivisionRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DivisionModule { }
