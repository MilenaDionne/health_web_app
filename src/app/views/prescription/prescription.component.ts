import {Component, Input, OnInit} from '@angular/core';
import {PatientFile} from '../../shared/models/patient-file.model';
import {DivisionInfo} from '../../shared/models/division-info.model';
import {PatientService} from '../../core/services/patient.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  currentPatient: any;
  currentId: string;
  noUnassignedPatients: boolean;
  patients: PatientFile[];
  unassignedPatients: PatientFile[] = [];
  patientForm: FormGroup;
  edited = false;
  @Input() activePatientFile: PatientFile;
  enteredFirstName: any;

  constructor(private builder: FormBuilder, private patientService: PatientService) { }


  ngOnInit(): void {
    this.patientService.getPatientFiles().subscribe(data => {
      this.patients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as PatientFile;
      });

      this.unassignedPatients = [];
      this.patients.forEach((element) => {
         this.unassignedPatients.push(element);
      });
    });

    this.patientForm = this.builder.group({
      id: ['', [Validators.required]],
      prescription: ['']
    });

    this.activePatientFile = this.patients[0];
    this.setFormValues();

  }

  setFormValues(): void{
    this.patientForm.controls.id.setValue(this.activePatientFile.id);
    this.patientForm.controls.lastName.setValue(this.activePatientFile.prescription);
    this.patientForm.disable();
  }

  onSubmit(): void{
    this.enteredId;
    return;
  }

  getPatientInformation(patientId: string): boolean {

    this.patientService.getPatientFile(patientId).subscribe(data => {
        if (data){
          this.currentPatient = data;
          return true;
        }
        else{
          return false;
        }
    });
    return true;
  }

  get enteredId(): AbstractControl{
    return this.patientForm.get('id');
  }

  get enteredPrescription(): AbstractControl{
    return this.patientForm.get('prescription');
  }

  get modifiedPatientFile(): PatientFile{
    this.activePatientFile.id = this.patientForm.controls.id.value;
    this.activePatientFile.prescription = this.patientForm.controls.prescription.value;
    return this.activePatientFile;
  }

  savePrescription(): void{
    this.patientService.addPrescription(this.modifiedPatientFile);
    this.patientForm.disable();
  }

}
