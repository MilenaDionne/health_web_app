import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myArray: any[] = [];
  user: User;
  private firstname: string;

  constructor(private authService: AuthService, public afs: AngularFirestore) {}
  firestoreDoctorsCollection = this.afs.collection('doctors');

  email = this.authService.getInfo();
  test = this.authService.getAuthState.subscribe(res => this.user = res);
  test2 = this.authService.getAuthState.subscribe(res => this.user.firstName = res.firstName);


  ngOnInit(): void {
    this.afs.collection('doctors').get().subscribe((ss) => {
      ss.docs.forEach((doc) => {this.myArray.push(doc.data()); });
    });
    this.afs.collection('nurses').get().subscribe((ss) => {
      ss.docs.forEach((doc) => {this.myArray.push(doc.data()); });
    });
    this.afs.collection('chargenurses').get().subscribe((ss) => {
      ss.docs.forEach((doc) => {this.myArray.push(doc.data()); });
    });

  }


}
