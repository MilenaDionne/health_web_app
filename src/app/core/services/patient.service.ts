import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {PatientFile} from '../../shared/models/patient-file.module';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }
  currentFile: PatientFile;

  getPatientFiles(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('patients').snapshotChanges();
  }

  getPatientFile(docId: string): Observable<unknown>{
    const data = this.firestore.collection('patients').doc(docId).valueChanges();
    return data;
  }

  // deletePatientFile(){
  //
  // }
  //
  updatePatientFile(docId: string, patId: string, action: string){
  
  }
}
