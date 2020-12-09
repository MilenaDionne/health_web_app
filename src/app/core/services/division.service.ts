import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {DivisionInfo} from '../../shared/models/division.model';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {AuthService} from './auth.service';
import {FirestoreService} from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private firestore: AngularFirestore,
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
    return this.store.getDivisions();
  }
}
