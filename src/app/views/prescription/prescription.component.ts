import {Component, Input, OnInit} from '@angular/core';
import {PatientFile} from '../../shared/models/patient-file.model';
import {PatientFacadeService} from '../../core/facades/patient-facade.service';
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

  constructor(private builder: FormBuilder, private patientFacadeService: PatientFacadeService) { }


  ngOnInit(): void {
    this.patientFacadeService.getPatientFiles().subscribe(data => {
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


      this.activePatientFile = this.patients[0];
      this.setFormValues();
    });

    this.patientForm = this.builder.group({
      id: ['', [Validators.required]],
      prescription: ['']
    });
  }

  setFormValues(): void{
    this.patientForm.controls.id.setValue(this.activePatientFile.id);

  }

  onSubmit(): void{
    return;
  }

  getPatientInformation(patientId: string): boolean {

    this.patientFacadeService.consultFile(patientId).subscribe(data => {
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
    this.patients.forEach((element) => {
      if ( element.id === this.currentId)
      {
        this.activePatientFile = element;
      }
    });
    this.activePatientFile.id = this.currentId;
    this.activePatientFile.prescription = this.patientForm.controls.prescription.value;
    return this.activePatientFile;
  }

  savePrescription(): void{
    this.patientFacadeService.addPrescription(this.modifiedPatientFile);
  }

}
