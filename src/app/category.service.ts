import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  data = {};
  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').snapshotChanges()
      .map(changes => {
        return changes.map(c => {
          this.data = c.payload.val();
          this.data['key'] = c.payload.key;
          return this.data;
        });
      });  
  }
}
