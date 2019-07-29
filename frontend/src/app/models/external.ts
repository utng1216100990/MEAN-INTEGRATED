export class External {
    constructor(_id = '', reason = '', cost = 0) {
        this._id = _id;
        this.reason = reason;
        this.cost = cost;
    }

    _id: string;
    reason: string;
    cost: number;
}
