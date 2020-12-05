import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {PatientService} from '../../core/services/patient.service';
import {PatientFile} from '../../shared/models/patient-file.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  get modifiedPatientFile(): PatientFile{
    this.activePatientFile.firstName = this.patientForm.controls.firstName.value;
    this.activePatientFile.lastName = this.patientForm.controls.lastName.value;
    this.activePatientFile.phoneNumber = this.patientForm.controls.phoneNumber.value;
    this.activePatientFile.email = this.patientForm.controls.email.value.toLowerCase();
    return this.activePatientFile;
  }

  get enteredFirstName(): AbstractControl {
    return this.patientForm.get('firstName');
  }

  get enteredPhoneNumber(): AbstractControl{
    return this.patientForm.get('phoneNumber');
  }

  get enteredEmail(): AbstractControl{
    return this.patientForm.get('email');
  }

  get enteredLastName(): AbstractControl{
    return this.patientForm.get('lastName');
  }

  @Input() activePatientFile: PatientFile;
  edited = false;
  patients: PatientFile[];
  emailRegex = '[a-z]+@[a-z]+.[a-z]{2,4}';
  phoneRegex = '\\d{1}\\d{1}\\d{1}\\d{1}\\d{1}\\d{1}\\d{1}\\d{1}\\d{1}\\d{1}\\d{1}';
  patientForm: FormGroup;


  ngOnInit(): void {
    // for testing only
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

    this.patientForm = this.builder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.pattern(this.emailRegex)]],
      phoneNumber: ['', [Validators.pattern(this.phoneRegex)]]
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

  editForm(): void {
    this.patientForm.enable();
    this.edited = true;
  }

  saveForm(): void{
    if (!this.patientForm.touched){
      alert('No values modified, noting to change!');
      return;
    }
    if (this.patientForm.invalid){
      alert('There are errors in the information entered, please check the form and try again.');
      return;
    }
    if (confirm('Are you sure you want to save the form?')){
      this.patientService.updatePatientFile(this.modifiedPatientFile);
      this.patientForm.disable();
      this.edited = false;
    }
  }
}
