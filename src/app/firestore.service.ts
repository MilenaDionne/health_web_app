import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Patient} from './shared/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  getUser(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('patients').snapshotChanges();
  }

  createUser(patient: Patient): Promise<DocumentReference> {
    delete patient.id;
    return this.firestore.collection('patients').add({...patient});
  }

  updateUser(patient: Patient): Promise<void> {
    const userId = patient.id;
    delete patient.id;
    return this.firestore.collection('patients').doc(userId).update(patient);
  }

  deleteUser(patientId: string): Promise<void> {
    return this.firestore.collection('patients').doc(patientId).delete();
  }
}
