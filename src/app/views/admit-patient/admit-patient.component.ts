import { Component, OnInit } from '@angular/core';
import {PatientFile} from '../../shared/models/patient-file.model';
import {DivisionInfo} from '../../shared/models/division.model';
import {PatientFacadeService} from '../../core/facades/patient-facade.service';
import {DivisionFacadeService} from '../../core/facades/division-facade.service';

@Component({
  selector: 'app-admit-patient',
  templateUrl: './admit-patient.component.html',
  styleUrls: ['./admit-patient.component.css']
})
export class AdmitPatientComponent implements OnInit {

  constructor(
    private patientFacade: PatientFacadeService,
    private divisionFacade: DivisionFacadeService
  ) { }

  capacity: boolean;
  noPatients: boolean;
  noUnassignedPatients: boolean;
  unassignedPatients: PatientFile[] = [];
  divisionPatients: PatientFile[] = [];

  currentPatient: string;
  currentDivision: string;
  currentPatientRE: string;
  currentDivisionRE: string;

  patients: PatientFile[];
  divisions: DivisionInfo[];

  addModifiedPatient(patients: PatientFile[], currentPatient: string, currentDivision?: string): PatientFile{
    const patient = patients.find(o => o.id === currentPatient);
    if (patient.divisionId == currentDivision){
      console.log("patient already exists error");
      return;
    }

    patient.divisionId = currentDivision;
    return patient;
  }

  removeModifiedPatient(patients: PatientFile[], currentPatient: string, currentDivision?: string): PatientFile{
    const patient = patients.find(o => o.id === currentPatient);
    patient.divisionId = null;
    return patient;
  }

  addModifiedDivision(divisions: DivisionInfo[], currentDivision: string, currentPatient: string): DivisionInfo{
    const division = divisions.find(o => o.id === currentDivision);
    division.patients.push(currentPatient);
    division.currentCapacity = (parseInt(division.currentCapacity) + 1).toString();
    return division;
  }

  removeModifiedDivision(divisions: DivisionInfo[], currentDivision: string, currentPatient: string): DivisionInfo{
    const division = divisions.find(o => o.id === currentDivision);
    division.patients.forEach((element, index) => {
      if (element == currentPatient){
        division.patients.splice(index, 1);
        if (!(division.patientRequests.length == 0)){
          division.patients.push(division.patientRequests[0]);
          division.patientRequests.splice(0, 1);
          return division;
        }
        division.currentCapacity = (parseInt(division.currentCapacity) - 1).toString();
        return division;
      }
    });

    return division;
  }

  addModifiedDivisionRequest(divisions: DivisionInfo[], currentDivision: string, currentPatient: string): DivisionInfo{
    const division = divisions.find(o => o.id === currentDivision);
    division.patientRequests.push(currentPatient);
    return division;
  }

  admitButton(): void{
    if (confirm('Are you sure you want to admit this patient?')){
      this.divisionFacade.updateDivisionInfo(this.addModifiedDivision(this.divisions, this.currentDivision, this.currentPatient));
      this.patientFacade.updatePatientFile(this.addModifiedPatient(this.patients, this.currentPatient, this.currentDivision));
      this.capacity = (this.divisions.find(o => o.id === this.currentDivision).totalCapacity == this.divisions.find(o => o.id === this.currentDivision).currentCapacity) ? true : false;
    }
  }

  admitListButton(): void{
    if (confirm('Are you sure you want to admit this patient?')){
      this.divisionFacade.updateDivisionInfo(this.addModifiedDivisionRequest(this.divisions, this.currentDivision, this.currentPatient));
      this.patientFacade.updatePatientFile(this.addModifiedPatient(this.patients, this.currentPatient, this.currentDivision));
      this.capacity = (this.divisions.find(o => o.id === this.currentDivision).totalCapacity == this.divisions.find(o => o.id === this.currentDivision).currentCapacity) ? true : false;
    }
  }

  removeButton(): void{
    if (confirm('Are you sure you want to remove this patient?')){
      this.divisionFacade.updateDivisionInfo(this.removeModifiedDivision(this.divisions, this.currentDivisionRE, this.currentPatientRE));
      this.patientFacade.updatePatientFile(this.removeModifiedPatient(this.patients, this.currentPatientRE, this.currentDivisionRE));
      this.capacity = (this.divisions.find(o => o.id === this.currentDivision).totalCapacity == this.divisions.find(o => o.id === this.currentDivision).currentCapacity) ? true : false;
    }
  }

  updatePatients(): void{
    this.divisionPatients = [];
    this.divisions.find(o => o.id === this.currentDivisionRE).patients.forEach((element) => {
      this.divisionPatients.push(this.patients.find(x => x.id === element));
    });
    if (!(this.divisionPatients.length === 0)){
      this.noPatients = false;
      this.currentPatientRE = this.divisionPatients[0].id;
    }
    else{
      this.noPatients = true;
    }
  }

  updateCapacity(): void{
    this.capacity = (this.divisions.find(o => o.id === this.currentDivision).totalCapacity === this.divisions.
    find(o => o.id === this.currentDivision).currentCapacity) ? true : false;
  }


  ngOnInit(): void {

    this.patientFacade.getPatientFiles().subscribe(data => {
      this.patients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as PatientFile;
      });

      this.unassignedPatients = [];
      this.patients.forEach((element) => {
        if (element.divisionId == null) this.unassignedPatients.push(element);
      })
      if (!(this.unassignedPatients.length == 0)){
        this.noUnassignedPatients = false;
        this.currentPatient = this.unassignedPatients[0].id;
      }
      else{
        this.noUnassignedPatients = true;
      }
    });

    this.divisionFacade.getDivisions().subscribe(data => {
      this.divisions = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as DivisionInfo;
      });
      this.currentDivisionRE = this.divisions[0].id;
      this.currentDivision = this.divisions[0].id;
      this.divisionPatients = [];
      this.divisions.find(o => o.id === this.currentDivisionRE).patients.forEach((element)=>{
        this.divisionPatients.push(this.patients.find(x => x.id === element));
      });
      if (!(this.divisionPatients.length === 0)){
        this.noPatients = false;
        this.currentPatientRE = this.divisionPatients[0].id;
      }
      else{
        this.noPatients = true;
      }

      this.capacity = (this.divisions.find(o => o.id === this.currentDivision).totalCapacity === this.divisions.find
      (o => o.id === this.currentDivision).currentCapacity) ? true : false;
    });

  }
}
