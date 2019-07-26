export class Internal {
    constructor(_id = '', type = '', responsible = '', amount = 0, reason = '') {
        this._id = _id;
        this.type = type;
        this.responsible = responsible;
        this.amount = amount;
        this.reason = reason;
    }

    _id: string;
    type: string;
    responsible: string;
    amount: number;
    reason: string;
}
