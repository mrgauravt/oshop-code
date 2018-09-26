import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  data = {};
  anotherData = {};

  constructor(private db: AngularFireDatabase,
              private shoppingCartService: ShoppingCartService) {}

  async placeOrder(order) {
    let result = await this.db.list('/order').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.db.list('/order').snapshotChanges()
    .map(changes => {
      return changes.map(c => {
        this.data = c.payload.val();
        this.data['key'] = c.payload.key;
        return this.data;
      });
    });  
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/order', ref => ref.orderByChild('userId').equalTo(userId))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => {
        this.anotherData = c.payload.val();
        this.anotherData['key'] = c.payload.key;
        return this.anotherData;
      });
    });
  }
  
}
