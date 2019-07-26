export class Menu {
    constructor(_id = '', type = '', name = '', description = '', price = 0, image = '') {
        this._id = _id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    _id: string;
    type: string;
    name: string;
    description: string;
    price: number;
    image: string
}
