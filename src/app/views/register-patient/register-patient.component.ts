import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PatientService} from '../../core/services/patient.service';
import {LoadingService} from '../../core/services/loading.service';
import {Router} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {Patient} from '../../shared/models/patient.model';

function genderValidator(control: FormControl): { [s: string]: boolean } | null {
  const validCategories = ['Female', 'Male'];
  if (!validCategories.includes(control.value)) {
    return {invalidCategory: true};
  }
}

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  patientFile = this.builder.group({
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    socialInsurance: ['', Validators.required],
    birthDate: ['', [Validators.required] ],
    gender: ['', [Validators.required, genderValidator]],
    maritalStatus: ['', [Validators.required]],
    externalDoctorId: [''],
    doctorId: ['']
  });

  get id(): AbstractControl {return this.patientFile.get('id'); }
  get firstName(): AbstractControl {return this.patientFile.get('firstName'); }
  get lastName(): AbstractControl {return this.patientFile.get('lastName'); }
  get socialInsurance(): AbstractControl {return this.patientFile.get('socialInsurance'); }
  get birthDate(): AbstractControl {return this.patientFile.get('birthDate'); }
  get gender(): AbstractControl {return this.patientFile.get('gender'); }
  get maritalStatus(): AbstractControl {return this.patientFile.get('maritalStatus'); }

  constructor(private builder: FormBuilder, private patientService: PatientService) { }

  ngOnInit(): void {}

  onSubmit(): void {
    const patient =  new Patient(this.patientFile.value.id,
      this.patientFile.value.firstName,
      this.patientFile.value.lastName,
      this.patientFile.value.socialInsurance,
      this.patientFile.value.birthDate,
      this.patientFile.value.gender,
      this.patientFile.value.maritalStatus,
      this.patientFile.value.externalDoctorId,
      this.patientFile.value.doctorId);
    this.patientService.addPatient(patient);
    this.patientFile.reset();
  }
}
