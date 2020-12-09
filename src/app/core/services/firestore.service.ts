import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Patient} from '../../shared/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  getPatient(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('patients').snapshotChanges();
  }

  creeatePatient(patient: Patient): Promise<DocumentReference> {
    delete patient.id;
    return this.firestore.collection('patients').add({...patient});
  }

  updatePatient(patient: Patient): Promise<void> {
    const userId = patient.id;
    delete patient.id;
    return this.firestore.collection('patients').doc(userId).update(patient);
  }

  deletePatient(patientId: string): Promise<void> {
    return this.firestore.collection('patients').doc(patientId).delete();
  }
}
