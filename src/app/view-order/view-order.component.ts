import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {
  order$ = {};

  constructor(private db: AngularFireDatabase) {
    let orderId = localStorage.getItem('orderId');

    this.getOrder(orderId).subscribe(data => {
      let totalPrice = 0;
      for (let i = 0; i < data['items'].length; i++) {
        totalPrice += data['items'][i]['totalPrice'];
      }
      data['totalPrice'] = totalPrice;
      this.order$ = data;
    });
  }

  getOrder(id) {
    return this.db.object('/order/' + id).valueChanges();
  }

}
