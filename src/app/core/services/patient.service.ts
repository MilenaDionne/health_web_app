import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {PatientFile} from '../../shared/models/patient-file.model';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getPatientFiles(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('patients').snapshotChanges();
  }

  getPatientFile(docId: string): Observable<unknown>{
    return this.firestore.collection('patients').doc(docId).valueChanges();
  }


  // deletePatientFile(){
  //
  // }
  //
  updatePatientFile(patientFile: PatientFile): void{
    this.firestore.collection('patients').doc(patientFile.id).update(patientFile).then(r => {
      alert('file updated successfully!');
    }).catch(error => {
      alert('Save unsuccessful' + error);
    });
  }
}
