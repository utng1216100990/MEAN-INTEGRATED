export class Photo {
    constructor(_id = '', title = '', description = '', imageURL = '', public_id = '') {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.public_id = public_id;
    }

    _id: string;
    title: string;
    description: string;
    imageURL: string;
    public_id: string;
}
