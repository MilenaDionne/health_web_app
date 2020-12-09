import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../core/services/patient.service';
import {Patient} from '../../shared/models/patient.model';

@Component({
  selector: 'app-consult-patient',
  templateUrl: './consult-patient.component.html',
  styleUrls: ['./consult-patient.component.css']
})
export class ConsultPatientComponent implements OnInit {

  constructor(private patientService: PatientService,) { }

  activePatient: any;
  patientId: string;

  ngOnInit(): void {
    this.patientId = '';
  }

  getPatientInformation(patientId: string): void{
      this.patientService.getPatientFile(patientId).subscribe(data => {
        try{
          if (data){
            this.activePatient = data;
          }
          else{
            alert('No patient found with that Id');
          }
        }
        catch (err){
          alert('Error' + err + 'occured');
        }
      });
    }

}
