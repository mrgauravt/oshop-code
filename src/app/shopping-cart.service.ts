import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  data = {};

  constructor(private db: AngularFireDatabase) { }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .map(x => new ShoppingCart(x['items']));
  }

  async addToCart(product) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    this.db.object('/shopping-carts/' + cartId + '/items/' + product.key)
    .valueChanges().take(1).subscribe(item => {
      if(item) {
        items$.update({ quantity: item['quantity'] + 1 });
      }
      else {
        items$.set({ product: product, quantity: 1 });
      }
    });
  }

  async removeFromCart(product) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    this.db.object('/shopping-carts/' + cartId + '/items/' + product.key)
    .valueChanges().take(1).subscribe(item => {  
      let quantity = item['quantity'] - 1;
      if(quantity === 0) {
        items$.remove();
      } else {
        items$.update({ product: product, quantity: quantity });
      }
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;     
  }  

}
