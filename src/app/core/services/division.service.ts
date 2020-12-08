import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {DivisionInfo} from '../../shared/models/division-info.module';
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

  getDivisionsInfos(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('divisions').snapshotChanges();
  }

  getDivisionInfo(docId: string): Observable<unknown>{
    const data = this.firestore.collection('divisions').doc(docId).valueChanges();
    return data;
  }

  popPatientList(docId: string): string{
    return;
  }

  getPatients(docId: string):string []{
    return;
  }

  addPatient(docId: string, patId: string){
    this.firestore.collection('divisions').doc(docId).update({
      patients: firebase.firestore.FieldValue.arrayUnion(patId)
    });
  }

  removePatient(docId: string, patId: string){
    this.firestore.collection('divisions').doc(docId).update({
      patients: firebase.firestore.FieldValue.arrayRemove(patId)
    });
  }

  addPatientRequest(docId: string, patId: string){
    this.firestore.collection('divisions').doc(docId).update({
      patientRequests: firebase.firestore.FieldValue.arrayUnion(patId)
    });
  }

  removePatientRequest(docId: string, patId: string): Observable<unknown>{
    const data = this.firestore.collection('divisions').doc(docId).valueChanges({
      patientRequests: firebase.firestore.FieldValue.bind(patId)
    });

    this.firestore.collection('divisions').doc(docId).update({
      patientRequests: firebase.firestore.FieldValue.arrayRemove(patId)
    });
    return data;
  }

  getTotalCapacity(docId: string){
    // const data = this.firestore.collection('divisions').doc(docId).ref => ref.orderByChild('totalCapacity');
    // return data;
  }

  getCurrentCapacity(docId: string){
    // const data = this.firestore.collection('divisions').doc(docId).valueChanges();
    // return data;
  }

  updateCurrentCapacity(docId: string){
    // const data = this.firestore.collection('divisions').doc(docId).valueChanges();
    // return data;
  }
}
