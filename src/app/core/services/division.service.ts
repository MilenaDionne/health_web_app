import { Injectable } from '@angular/core';
import { DocumentChangeAction} from '@angular/fire/firestore';
import {DivisionInfo} from '../../shared/models/division.model';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {FirestoreService} from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private authService: AuthService,
    private store: FirestoreService
  ) { }
  currentFile: DivisionInfo;

  updateDivisionInfo(divisionInfo: DivisionInfo): void{
    this.store.updateDivisionInfo(divisionInfo);
  }

  getDivisions(): Observable<DocumentChangeAction<unknown>[]>{
    return this.store.getDivisions();
  }

  getDivision(docId: string): Observable<unknown>{
    return this.store.getDivision(docId);
  }

  getAvailableBeds(docId: string): string{
    return this.store.getDivisionCapacity(docId); // dont use
  }
}
