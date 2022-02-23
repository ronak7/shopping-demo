const mongoose = require("mongoose");

const CartScheema = mongoose.Schema({
    products: [
        {
            productId: String,
            name: String,
            price: Number,
            qty: Number,
            total: Number,
            image: String
        }
    ],
    subtotal: { type: Number, require: true },
    user: { type: Number, default: 1 },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('carts', CartScheema);