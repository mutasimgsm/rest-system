import { OrderCartItem } from './order-cart-item';

export class OrderCart {
    items: OrderCartItem[];

    get totalItemsCount() {
        let count = 0;
        for (let itemId in this.items)
            count += this.items[itemId].quantity;
        return count;
    }

}