import { Component, OnInit } from '@angular/core';
import {DivisionService} from '../../core/services/division.service';
import {Division} from '../../shared/models/division.model';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  constructor(
    private divisionService: DivisionService,
  ) { }

  activeDivision: any;
  divisionId: string;

  ngOnInit(): void {
    this.divisionId = '';
  }

  getDivisionInformation(divisionId: string): void{
    this.divisionService.getDivision(divisionId).subscribe(data => {
      try{
        if (data){
          this.activeDivision = data;
        }
        else{
          alert('No division found with that Id');
        }
      }
      catch (err){
        alert('Error' + err + 'occured');
      }
    });
  }

}
