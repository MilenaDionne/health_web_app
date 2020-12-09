import {Validators} from '@angular/forms';
import {last} from 'rxjs/operators';

export class Patient {
  id: string;
  firstName: string;
  lastName: string;
  socialInsurance: number;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  externalDoctorId?: string;
  doctorId?: string;

  constructor(id: string, firstName: string, lastName: string, socialInsurance: number, birthDate: string,
              gender: string, maritalStatus: string, externalDoctorId?: string, doctorId?: string) {
    this.id = null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socialInsurance = socialInsurance;
    this.birthDate = birthDate;
    this.gender = gender;
    this.maritalStatus = maritalStatus;
    this.externalDoctorId = externalDoctorId;
    this.doctorId = doctorId;
  }
}
