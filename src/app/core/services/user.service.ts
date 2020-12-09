import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Patient} from '../../shared/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedElement = new BehaviorSubject<Patient>(null);
  constructor() { }

  public selectionChanged(patient: Patient): void {
    this.selectedElement.next(patient);
  }
}
