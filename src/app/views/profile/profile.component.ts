import {Component, Input, OnInit} from '@angular/core';
import {MedicalStaff, User} from '../../shared/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  @Input() users: Observable<MedicalStaff>;

  constructor(private authService: AuthService, public afs: AngularFirestore) {
    this.users = authService.getUser;
    this.users.subscribe(res => {
      console.log(res);
    });
  }
  firestoreDoctorsCollection = this.afs.collection('doctors');

  ngOnInit(): void {
  }


}
