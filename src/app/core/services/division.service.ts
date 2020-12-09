import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {DivisionInfo} from '../../shared/models/division.model';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }
  currentFile: DivisionInfo;

  updateDivisionInfo(divisionInfo: DivisionInfo): void{
    this.firestore.collection('divisions').doc(divisionInfo.id).update(divisionInfo).then(r => {
      alert('file updated successfully!');
    }).catch(error => {
      alert('Save unsuccessful' + error);
    });
  }

  getDivisions(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('divisions').snapshotChanges();
  }

  getDivision(docId: string): Observable<unknown>{
    return this.firestore.collection('divisions').doc(docId).valueChanges();
  }
}
