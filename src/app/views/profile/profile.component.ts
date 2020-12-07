import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myArray: any[] = [];

  constructor(private authService: AuthService, public afs: AngularFirestore) {}
  firestoreDoctorsCollection = this.afs.collection('doctors');

  email = this.authService.getInfo();

  ngOnInit(): void {
        this.afs.collection('doctors').get().subscribe((ss) => {
        ss.docs.forEach((doc) => {this.myArray.push(doc.data()); });
      });
  }

}
