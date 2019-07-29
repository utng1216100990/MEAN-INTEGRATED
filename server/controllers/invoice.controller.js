const Invoice = require('../models/invoice');

const invoiceCtrl = {};

invoiceCtrl.getInvoices = async (req, res) => {
     const invoices = await Invoice.find();
     res.json(invoices);
};

invoiceCtrl.createInvoice = async (req, res) => {
    const invoice = new Invoice({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    });
    await invoice.save();
    res.json({
        'status': 'Factura guardada'
    });
};

invoiceCtrl.getInvoice = async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    res.json(invoice);
};

invoiceCtrl.editInvoice = async (req, res) => {
    const { id } = req.params;
    const invoice = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    };
    await Invoice.findByIdAndUpdate(id, {$set: invoice}, {new: true});
    res.json({status: 'Factura actualizada'});
}

invoiceCtrl.deleteInvoice = async (req, res) => {
    await Invoice.findByIdAndRemove(req.params.id);
    res.json({status: 'Factura eliminada'});
}

module.exports = invoiceCtrl; 