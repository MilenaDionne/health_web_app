import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../core/services/patient.service';
import {PatientFile} from '../../shared/models/patient-file.module';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  constructor(
    private patientService: PatientService
  ) { }

  currentPatient: PatientFile;
  patients: PatientFile[];

  ngOnInit(): void {
    this.patientService.getPatientFile('iYGvNrLvtwfOLYemX0NE').subscribe(data => {
      this.currentPatient = {
        // @ts-ignore
        firstName: data.firstName,
        // @ts-ignore
        lastName: data.lastName,
        // @ts-ignore
        id: data.id,
      };
      console.log(this.currentPatient);
    });
  }

}
