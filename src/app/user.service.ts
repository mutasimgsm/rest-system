import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<firebase.User>
  returnedUser;

  constructor(private db: AngularFireDatabase) { }

   save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
   }
   
   get(uid: string): AngularFireObject<AppUser> {
     return this.db.object('/users/' + uid);
   }

   login() {
   return this.db.list('/users')
     .snapshotChanges().pipe(
      map(actions => { return  actions.map(a => { return ({ key: a.key, ...a.payload.val() }) })
     })); 

    }

  //  login(user): Observable<Object> {
  //   let result;
  //    this.db.list('/users/')
  //   .valueChanges()
  //     .subscribe(u => {
  //       // this.returnedUser =
  //        result = u.filter(x => (x['email'] === user.email && x['password'] === user.password));
  //        console.log('result ', result)
         
  //       // console.log('user ', this.returnedUser);
  //       // return this.returnedUser;
  //       });
  //       return result;
  //  }

   createUser(user) {
     return this.db.list('/users/').push({
       email: user.email,
       isAdmin: false,
       name: user.name,
       password: user.password
     });
   }
}
