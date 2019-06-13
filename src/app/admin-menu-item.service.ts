import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuItemService {
 
  constructor(private db: AngularFireDatabase) { }

  getMenu() {
    // return this.db.list('/menu').stateChanges();
    return this.db.list('/menu')
     .snapshotChanges().pipe(
      map(actions => { return  actions.map(a => { return ({ key: a.key, ...a.payload.val() }) })
     })); 
  }

  create(item) {
    return this.db.list('/items').push(item);
  }

  getAll() {
     return this.db.list('/items')
     .snapshotChanges().pipe(
      map(actions => { return  actions.map(a => { return ({ key: a.key, ...a.payload.val() }) })
     })); 
  } 

  getItem(itemId) {
    // return this.db.list('/items/' + itemId);
    return this.db.object('/items/' + itemId)
    .snapshotChanges().pipe(
      map(actions => { return  ({ key: actions.key, ...actions.payload.val() }) })
    );
  }

  update(itemId, item) {
    return this.db.object('/items/' + itemId).update(item);
  }

  delete(itemId) {
    return this.db.object('/items/' + itemId).remove();
  }

  }
  