const Supplier = require('../models/supplier');
const supplierCtrl = {};

supplierCtrl.getSuppliers = async (req, res) => {
    const suppliers = await Supplier.find();
    res.json(suppliers);
};

supplierCtrl.createSupplier = async (req, res) => {
    const supplier = new Supplier({
        companyName: req.body.companyName,
        contactName: req.body.contactName,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone
    });
    await supplier.save();
    res.json({ status: "Supplier saved!" });
};

supplierCtrl.getSupplier = async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
};

supplierCtrl.editSupplier = async (req, res) => {
    const { id } = req.params;
    const supplier = {
        companyName: req.body.companyName,
        contactName: req.body.contactName,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone
    };
    await Supplier.findByIdAndUpdate(id, { $set: supplier }, { new: true });
    res.json({ status: "Supplier updated!" });
}

supplierCtrl.deleteSupplier = async (req, res) => {
    await Supplier.findByIdAndRemove(req.params.id);
    res.json({ status: "Supplier deleted!" });
};

module.exports = supplierCtrl;