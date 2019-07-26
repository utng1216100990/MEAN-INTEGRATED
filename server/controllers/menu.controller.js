const Menu = require('../models/menu');
const menuCtrl = {};

menuCtrl.findAll = async (req, res) => {
    const findAll = await Menu.find();
    res.json(findAll);
}

menuCtrl.createMenu = async (req, res) => {
    const { type, name, description, price, image } = req.body;
    const menu = new Menu({
        type, name, description, price, image
    });
    await menu.save();
    res.json({ status: "Menu saved!" });
}

menuCtrl.getMenu = async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    res.json(menu);
}

menuCtrl.editMenu = async (req, res) => {
    const { id } = req.params;
    const menu = {
        type: req.body.type, 
        name: req.body.name, 
        description: req.body.description, 
        price: req.body.price, 
        image: req.body.image
    };
    await Menu.findByIdAndUpdate(id, { $set: menu }, { new: true });
    res.json({ status: "Menu updated!" });
}

menuCtrl.deleteMenu = async (req, res) => {
    await Menu.findByIdAndRemove(req.params.id);
    res.json({ status: "Menu deleted!" });
}

module.exports = menuCtrl;