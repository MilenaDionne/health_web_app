import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {PatientFile} from '../../shared/models/patient-file.model';
import {Patient} from '../../shared/models/patient.model';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import firebase from 'firebase';
import {FirestoreService} from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients = [
    new Patient('1', 'John', 'Doe', 123456789, '15 juin 1999', 'male', 'married'),
  ];

  currentPatient: Patient = null;

  msgStyle = {
    color: null,
    'background-color': 'white',
    'font-size': '150%',
  };
  message: string;
  hideMsg = true;

  constructor(
    private firestore: AngularFirestore, private userService: UserService, private store: FirestoreService) { }

  showMessage(type: string, msg: string): void {
    this.msgStyle.color = type === 'error' ? 'red' : 'blue';
    this.message = msg;
    this.hideMsg = false;
    setTimeout(
      () => {
        this.hideMsg = true;
      }, 2500
    );
  }

  getPatientFiles(): Observable<DocumentChangeAction<unknown>[]>{
    return this.store.getPatientFiles();
  }

  getPatientFile(docId: string): Observable<unknown>{
    return this.store.getPatientFile(docId);
  }

  addPatient(p: Patient): void{
    this.patients.push(p);
    this.select(p);

    if (this.currentPatient.id === null){
      this.store.creeatePatient(this.currentPatient).then(
        docRef => {
        this.currentPatient.id = docRef.id;
        this.showMessage('info', 'The address entry was successfully saved');
        }
      ).catch(_ =>
      this.showMessage('error', 'Error unable to save the address entry'));
    } else {
      this.store.updatePatient(this.currentPatient).then(_ =>
      this.showMessage('info', 'The addres entry was successfully updated'))
        .catch(_ =>
        this.showMessage('error', 'Error unable to update the address entry'));
    }
  }

  select(patient: Patient): void {
    this.currentPatient = patient;
    this.userService.selectionChanged(patient);
  }

  // deletePatientFile(){
  //
  // }
  //
  updatePatientFile(patientFile: PatientFile): void{
    this.store.updatePatientFile(patientFile);
  }
  updatePatient(patientFile: Patient): void{
    this.firestore.collection('patients').doc(patientFile.id).update(patientFile).then(r => {
      alert('file updated successfully!');
    }).catch(error => {
      alert('Save unsuccessful' + error);
    });
  }

  addPrescription(patientFile: PatientFile): void{
    this.store.addPrescription(patientFile);
  }


}
