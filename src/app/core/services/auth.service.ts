import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserCredential } from '@firebase/auth-types';

import { User, MedicalStaff } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState: Observable<User>;
  readonly user: Observable<User>;
  userinfo: string;


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.authState = this.afAuth.authState;
    this.user = this.afAuth.authState.pipe(
      switchMap((user: User) => {
        return user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null);
      })
    );
  }

  get getUser(): Observable<User> {
    return this.user;
  }

  getInfo(): string{
    return this.userinfo;
  }

  public setInfo(email: string): void {
    this.userinfo = email;
  }

  get getAuthState(): Observable<User> {
    return this.authState;
  }

  public login(email: string, password: string): Promise<UserCredential> {
    this.setInfo(email);
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


  public logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  public async register(medicalStaff: MedicalStaff, password: string): Promise<User | void> {
    const {employeeNumber, email, firstName, lastName, role} = medicalStaff;
    return this.afAuth.createUserWithEmailAndPassword(email, password) // firebase auth
      .then(async (credentials) => {
        const newUser: MedicalStaff = {
          employeeNumber,
          email: credentials.user.email,
          firstName,
          lastName,
          role,
          uid: credentials.user.uid,
        };
        console.log(newUser.role);
        await this.afs.doc<MedicalStaff>(`${newUser.role.toLowerCase()}s/${newUser.uid}`).set(newUser); // push to firestore
      });
  }


}
