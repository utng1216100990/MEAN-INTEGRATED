const Order = require('../models/order');
const orderCtrl = {};

orderCtrl.findAll = async (req, res) => {
    const findAll = await Order.find();
    res.json(findAll);
}

orderCtrl.createOrder = async (req, res) => {
    const { type, name, price, quantity } = req.body;
    const order = new Order({
        type, name, price, quantity
    });
    await order.save();
    res.json({ status: "Order saved!" });
}

orderCtrl.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
}

orderCtrl.editOrder = async (req, res) => {
    const { id } = req.params;
    const order = {
        type: req.body.type, 
        name: req.body.name, 
        price: req.body.price, 
        quantity: req.body.quantity
    };
    await Order.findByIdAndUpdate(id, { $set: order }, { new: true });
    res.json({ status: "Order updated!" });
}

orderCtrl.deleteOrder = async (req, res) => {
    await Order.findByIdAndRemove(req.params.id);
    res.json({ status: "Order deleted!" });
}

module.exports = orderCtrl;