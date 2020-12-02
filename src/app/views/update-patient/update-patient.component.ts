import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {PatientService} from '../../core/services/patient.service';
import {PatientFile} from '../../shared/models/patient-file.model';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Template} from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})

export class UpdatePatientComponent implements OnInit {

  constructor(
    private patientService: PatientService,
    private builder: FormBuilder,
    public dialog: MatDialog
  ) { }

  @Input() activePatientFile: PatientFile;
  edited = false;
  patients: PatientFile[];
  emailRegex = 'a';
  phoneRegex = 'b';

  patientForm = this.builder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.pattern(this.emailRegex)]],
    phoneNumber: ['', [Validators.pattern(this.phoneRegex)]]
  });

  ngOnInit(): void {
    this.patientService.getPatientFiles().subscribe(data => {
      this.patients = data.map(e => {
        console.log(e.payload);
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as PatientFile;
      });
      console.log(this.patients);
      this.activePatientFile = this.patients[0];
      this.setFormValues();
    });

  }

  onSubmit(): void{
    return;
  }

  setFormValues(): void{
    this.patientForm.controls.firstName.setValue(this.activePatientFile.firstName);
    this.patientForm.controls.lastName.setValue(this.activePatientFile.lastName);
    this.patientForm.controls.phoneNumber.setValue(this.activePatientFile.phoneNumber);
    this.patientForm.controls.email.setValue(this.activePatientFile.email);
    this.patientForm.disable();
  }

  get modifiedPatientFile(): PatientFile{
    this.activePatientFile.firstName = this.patientForm.controls.firstName.value;
    this.activePatientFile.lastName = this.patientForm.controls.lastName.value;
    this.activePatientFile.phoneNumber = this.patientForm.controls.phoneNumber.value;
    this.activePatientFile.email = this.patientForm.controls.email.value;
    return this.activePatientFile;
  }

  get enteredFirstName(): AbstractControl {
    return this.patientForm.get('firstName');
  }

  editForm(): void {
    this.patientForm.enable();
    this.edited = true;
  }

  saveForm(): void{
    if (confirm('Are you sure you want to save the form?')){
      this.patientService.updatePatientFile(this.modifiedPatientFile);
    }
  }


}
