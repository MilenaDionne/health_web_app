import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../core/services/patient.service';
import {PatientFile} from '../../shared/models/patient-file.module';
import {DivisionService} from '../../core/services/division.service';
import {DivisionInfo} from '../../shared/models/division-info.module';



@Component({
  selector: 'app-admit-patient',
  templateUrl: './admit-patient.component.html',
  styleUrls: ['./admit-patient.component.css']
})
export class AdmitPatientComponent implements OnInit {

  constructor(
    private patientService: PatientService,
    private divisionService: DivisionService
  ) { }

  capacity: boolean;
  unassignedPatients: PatientFile[] = [];
  divisionPatients: PatientFile[] = [];

  currentPatient: string;
  currentDivision: string;
  currentPatientRE: string;
  currentDivisionRE: string;

  patients: PatientFile[];
  divisions: DivisionInfo[];
  allPatients: PatientFile[] = [];
  allDivisions: DivisionInfo[] = [];


  admitButton(): void{
    if (confirm('Are you sure you want to admit this patient?')){
      this.divisionService.addPatient(this.currentDivision, this.currentPatient);
      this.patientService.updatePatientFile(this.currentPatient, this.currentDivision, "admit");
      this.capacity = (this.divisionService.getTotalCapacity(this.currentDivision) == this.divisionService.getCurrentCapacity(this.currentDivision)) ? true : false;
    }
  }

  admitListButton(): void{
    if (confirm('Are you sure you want to admit this patient?')){
      this.divisionService.addPatientRequest(this.currentDivision, this.currentPatient);
      this.patientService.updatePatientFile(this.currentPatient, this.currentDivision, "admit");
      this.capacity = (this.divisionService.getTotalCapacity(this.currentDivision) == this.divisionService.getCurrentCapacity(this.currentDivision)) ? true : false;
    }
  }

  removeButton(): void{
    if (confirm('Are you sure you want to remove this patient?')){
      this.divisionService.removePatient(this.currentDivision, this.currentPatient);
      this.patientService.updatePatientFile(this.currentPatient, this.currentDivision, "remove");
      if (this.capacity){
        if (!this.divisions[this.currentDivisionRE].patientRequests == null){}
          this.divisionService.addPatient(this.currentDivision, this.divisionService.popPatientList(this.currentDivision));
      }
    }
  }

  updatePatients(): void{
    console.log(this.currentDivisionRE);
    this.divisionPatients = this.allDivisions[this.currentDivisionRE].patients;
    console.log(this.divisionPatients);
  }


  ngOnInit(): void {

    this.patientService.getPatientFiles().subscribe(data => {
      this.patients = data.map(e => {
        //console.log(e.payload);
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as PatientFile;
      });
      //console.log(this.patients);
      this.patients.forEach((element)=>{
        this.allPatients.push(element);
      })
    })

    console.log(this.allPatients);
    this.unassignedPatients = this.allPatients;
    // this.allPatients.forEach((element)=>{
    //   console.log(element.divisionId == null);
    //   if (element.divisionId == null) this.unassignedPatients.push(element);
    // })

    this.divisionService.getDivisionsInfos().subscribe(data => {
      this.divisions = data.map(e => {
        //console.log(e.payload);
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as DivisionInfo;
      });
      //console.log(this.divisions);
      this.divisions.forEach((element)=>{
        this.allDivisions.push(element);
      })
    })

    console.log(this.allDivisions);
    //this.divisionPatients = this.allDivisions[this.currentDivisionRE].patients;
    this.capacity = (this.allDivisions[this.currentDivision].totalCapacity == this.allDivisions[this.currentDivision].currentCapacity) ? true : false;
  
  };
}
