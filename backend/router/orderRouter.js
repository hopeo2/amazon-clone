const express = require('express')
const expressAsyncHandlers = require('express-async-handler')
const { isAuth } = require('../util')
const Order = require('../models/orderModel')



const orderRouter = express.Router()

orderRouter.post('/', isAuth, expressAsyncHandlers(async(req, res) => {
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        itemprice: req.body.itemprice,
        taxPrice: req.body.taxPrice,
        totalprice: req.body.totalprice,
        shippingprice: req.body.shippingprice,
        payment: req.body.payment
    })
    const createdorder = await order.save()
    res.status(201).send({message: 'New Order Created', order: createdorder})
}))

module.exports = orderRouter