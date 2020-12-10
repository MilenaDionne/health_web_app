import { Injectable } from '@angular/core';
import {DivisionService} from '../services/division.service';
import {DivisionInfo} from '../../shared/models/division.model';
import {Observable} from 'rxjs';
import {DocumentChangeAction} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DivisionFacadeService {

  constructor(private divisionService: DivisionService) { }

  updateDivisionInfo(divisionInfo: DivisionInfo): void{
    this.divisionService.updateDivisionInfo(divisionInfo);
  }

  getDivisions(): Observable<DocumentChangeAction<unknown>[]>{
    return this.divisionService.getDivisions();
  }

}
