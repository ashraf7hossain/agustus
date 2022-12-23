import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private fireStoreDoc;
  constructor(private afs: Firestore, private userData: UserData) {
    this.initializeFirestore();

  }

  initializeFirestore() {

    const firestoreCollection = collection( this.afs, 'augustus');
    this.fireStoreDoc = doc(firestoreCollection, 'development' );
  }
  
  /**
  *
  * @param collectionName
  * @param documentName
  * @param data
  *
  */
  saveDocument(collectionName: string, documentName: string = '', data: any): Promise<any> {
    const savedata = Object.assign({}, data);
    return this.fireStoreDoc
      .collection(collectionName).doc(String(documentName)).set(savedata);
  }

  /**
   *
   * @param collectionName
   * @param documentName
   * @param data
   *
   */
  updateDocument(collectionName: string, documentName: string = '', data: any): Promise<any> {
    const savedata = Object.assign({}, data);
    return this.fireStoreDoc
      .collection(collectionName).doc(String(documentName)).update(savedata);
  }



}
