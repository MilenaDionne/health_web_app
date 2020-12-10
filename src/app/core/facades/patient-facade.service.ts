import { Injectable } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Patient} from '../../shared/models/patient.model';
import {PatientFile} from '../../shared/models/patient-file.model';

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
}
