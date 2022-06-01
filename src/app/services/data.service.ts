import { Injectable } from '@angular/core';
import { Firestore,  addDoc, updateDoc, collection, collectionData, doc, docData, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  Id? : string
  name : string
  age : string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore:  Firestore) { }

  getNotes(): Observable<Note[]>{
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, {idField: 'Id'}) as Observable<Note[]>;
    
  }
  getNoteById(Id): Observable<Note>{
    const noteDocRef = doc(this.firestore, `notes/${Id}`);
    return docData(noteDocRef, {idField: 'Id'}) as Observable<Note>;
    
  }
  
  addNote(note:Note){
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNote(note:Note){
    const noteDocRef = doc(this.firestore,  `notes/${note.Id}`);
    return deleteDoc(noteDocRef);
  }
  
  updateNote(note:Note){
    const noteDocRef = doc(this.firestore,  `notes/${note.Id}`);
    return updateDoc(noteDocRef, {name: note.name, age:note.age});
  }
}
