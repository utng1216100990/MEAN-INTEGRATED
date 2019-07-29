export class Invoice {
    constructor(_id = '', title = '', description = '', date = '') {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.date = date;
    }

    _id: string;
    title: string;
    description: string;
    date: string;
}
