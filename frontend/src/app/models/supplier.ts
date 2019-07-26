export class Supplier {
    constructor(_id = '', companyName = '', contactName = '', address = '', city = '', phone = 0) {
        this._id = _id;
        this.companyName = companyName;
        this.contactName = contactName;
        this.address = address;
        this.city = city;
        this.phone = phone;
    }

    _id: string;
    companyName: string;
    contactName: string;
    address: string;
    city: string;
    phone: number;
}
