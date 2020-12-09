import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MedicalStaff, User} from '../../shared/models/user.model';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserManagementFacadeService {

  constructor(private authService: AuthService) {
  }

  public async registerStaff(medicalStaff: MedicalStaff, password: string): Promise<User | void>{
     return this.authService.register(medicalStaff, password);
  }

  public async staffLogin(email: string, password: string): Promise<UserCredential>{
    return this.authService.login(email, password);
  }

  public staffLogout(): Promise<void>{
    return this.authService.logout();
  }
}
