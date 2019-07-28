export class Order {
    constructor(_id = '', type = '', name = '', price = 0, quantity = 0) {
        this._id = _id;
        this.type = type;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    _id: string;
    type: string;
    name: string;
    price: number;
    quantity: number;
}
