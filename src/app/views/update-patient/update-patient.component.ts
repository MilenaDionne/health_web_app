import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../core/services/patient.service';
import {PatientFile} from '../../shared/models/patient-file.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../shared/models/patient.model';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})

export class UpdatePatientComponent implements OnInit {

  constructor(
    private patientService: PatientService,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  get modifiedPatientFile(): Patient{
    this.activePatientFile.firstName = this.patientForm.controls.firstName.value;
    this.activePatientFile.lastName = this.patientForm.controls.lastName.value;
    this.activePatientFile.socialInsurance = this.patientForm.controls.socialInsurance.value;
    this.activePatientFile.birthDate = this.patientForm.controls.birthDate.value;
    this.activePatientFile.gender = this.patientForm.controls.gender.value;
    this.activePatientFile.maritalStatus = this.patientForm.controls.maritalStatus.value;
    this.activePatientFile.externalDoctorId = this.patientForm.controls.externalDoctorId.value;
    this.activePatientFile.doctorId = this.patientForm.controls.doctorId.value;
    return this.activePatientFile;
  }

  get enteredFirstName(): AbstractControl {
    return this.patientForm.get('firstName');
  }

  get enteredLastName(): AbstractControl{
    return this.patientForm.get('lastName');
  }

  get enteredSocialInsurance(): AbstractControl {
    return this.patientForm.get('socialInsurance');
  }

  get enteredBirthDate(): AbstractControl{
    return this.patientForm.get('birthDate');
  }

  get enteredGender(): AbstractControl {
    return this.patientForm.get('gender');
  }

  get enteredMartialStatus(): AbstractControl{
    return this.patientForm.get('maritalStatus');
  }

  get enteredExternalDoctorId(): AbstractControl {
    return this.patientForm.get('externalDoctorId');
  }

  get enteredDoctorId(): AbstractControl{
    return this.patientForm.get('doctorId');
  }

  activePatientFile: Patient;
  edited = false;
  patients: PatientFile[];
  patientId: string;
  patientForm: FormGroup;
  socialInsuranceRegex = '\\d{9}';
  genderRegex = '(male|female)';


  ngOnInit(): void {
    this.patientForm = this.builder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      socialInsurance: ['', [Validators.required, Validators.pattern(this.socialInsuranceRegex)]],
      birthDate: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern(this.genderRegex)]],
      maritalStatus: ['', Validators.required],
      externalDoctorId: '',
      doctorId: '',
    });
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatientFile(this.patientId).subscribe(data => {
      this.activePatientFile = {
        id: this.patientId,
        firstName: data.firstName,
        lastName: data.lastName,
        socialInsurance: data.socialInsurance,
        birthDate: data.birthDate,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        externalDoctorId: data.externalDoctorId,
        doctorId: data.doctorId
      } as Patient;
      this.setFormValues();
    });

  }

  onSubmit(): void{
    return;
  }

  setFormValues(): void{
    this.patientForm.controls.firstName.setValue(this.activePatientFile.firstName);
    this.patientForm.controls.lastName.setValue(this.activePatientFile.lastName);
    this.patientForm.controls.socialInsurance.setValue(this.activePatientFile.socialInsurance);
    this.patientForm.controls.birthDate.setValue(this.activePatientFile.birthDate);
    this.patientForm.controls.gender.setValue(this.activePatientFile.gender);
    this.patientForm.controls.maritalStatus.setValue(this.activePatientFile.maritalStatus);
    this.patientForm.controls.externalDoctorId.setValue(
      this.activePatientFile.externalDoctorId === '' ? '' : this.activePatientFile.externalDoctorId
    );
    this.patientForm.controls.doctorId.setValue(this.activePatientFile.doctorId === '' ? '' : this.activePatientFile.doctorId);
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
