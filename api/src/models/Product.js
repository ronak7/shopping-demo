const mongoose = require("mongoose");

const ProductScheema = mongoose.Schema({
    name: { type: String, require: true },
    slug: { type: String },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('products', ProductScheema);