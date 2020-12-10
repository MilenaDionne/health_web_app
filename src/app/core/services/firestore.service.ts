import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Patient} from '../../shared/models/patient.model';
import {DivisionInfo} from '../../shared/models/division.model';
import {PatientFile} from '../../shared/models/patient-file.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  getPatientFiles(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('patients').snapshotChanges();
  }

  getPatientFile(docId: string): Observable<unknown>{
    return this.firestore.collection('patients').doc(docId).valueChanges();
  }

  createPatient(patient: Patient): Promise<DocumentReference> {
    delete patient.id;
    return this.firestore.collection('patients').add({...patient});
  }

  updatePatient(patient: Patient): Promise<void> {
    const userId = patient.id;
    delete patient.id;
    return this.firestore.collection('patients').doc(userId).update(patient);
  }
  updatePatientFile(patientFile: PatientFile): void{
    this.firestore.collection('patients').doc(patientFile.id).update(patientFile).then(r => {
      alert('file updated successfully!');
    }).catch(error => {
      alert('Save unsuccessful' + error);
    });
  }

  deletePatient(patientId: string): Promise<void> {
    return this.firestore.collection('patients').doc(patientId).delete();
  }

  addPrescription(patientFile: PatientFile): void{
    this.firestore.collection('patients').doc(patientFile.id).update(patientFile).then(r => {
      alert('file updated successfully!');
    }).catch(error => {
      alert('Save unsuccessful' + error);
    });
  }

 /// division

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

  getDivisionCapacity(docId: string): string{
    let capacity = '';
    this.firestore.collection("divisions").doc(docId).get().toPromise().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        capacity = "sfsf";
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    return capacity;
  }
}
