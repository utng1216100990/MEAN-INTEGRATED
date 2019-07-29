const External = require('../models/external');
const externalCtrl = {};

externalCtrl.getExternals = async (req, res) => {
     const externals = await External.find();
     res.json(externals);
};

externalCtrl.createExternal = async (req, res) => {
    const externals = new External({
        reason: req.body.reason,
        cost: req.body.cost
    });
    await externals.save();
    res.json({
        'status': 'Expense saved'
    });
};

externalCtrl.getExternal = async (req, res) => {
    const external = await External.findById(req.params.id);
    res.json(external);
};

externalCtrl.editExternal = async (req, res) => {
    const { id } = req.params;
    const external = {
        reason: req.body.reason,
        cost: req.body.cost
    };
    await External.findByIdAndUpdate(id, {$set: external}, {new: true});
    res.json({status: 'Expense Updated'});
}

externalCtrl.deleteExternal = async (req, res) => {
    await External.findByIdAndRemove(req.params.id);
    res.json({status: 'Expense Deleted'});
}

module.exports = externalCtrl; 