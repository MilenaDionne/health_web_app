import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getDivisions(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('divisions').snapshotChanges();
  }

  getDivision(docId: string): Observable<unknown>{
    return this.firestore.collection('divisions').doc(docId).valueChanges();
  }
}
