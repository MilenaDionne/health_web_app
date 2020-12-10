import { Injectable } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Patient} from '../../shared/models/patient.model';
import {PatientFile} from '../../shared/models/patient-file.model';
import {Observable} from 'rxjs';
import {DocumentChangeAction} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientFacadeService {

  constructor(private patientService: PatientService) { }

  public generatePatient(p: Patient): void{
    this.patientService.addPatient(p);
  }

  public addPrescription(patientFile: PatientFile): void{
    this.patientService.addPrescription(patientFile);
  }
  public consultFile(patientId: string): Observable<unknown>
  {
    return this.patientService.getPatientFile(patientId);
  }
  public getPatientFiles(): Observable<DocumentChangeAction<unknown>[]>{
    return this.patientService.getPatientFiles();
  }
}
