const slug = require('slug')
const path = require('path')
const fs = require('fs')

const Product = require('./../models/Product');

const getProduct = async (req, res) => {
    try {

        let skip = req.params.skip ? req.params.skip : 0;
        let limit = req.params.limit ? req.params.limit : 5;
        let countAllProducts = await Product.count();
        let pages = Math.ceil(countAllProducts / limit) 
        // let data = await Product.find().skip(skip).limit(limit);
        let data = await Product.find();

        res.status(200).json({
            status: true,
            msg: "Product List.",
            data:data,
            pagination: {pages, limit, skip}
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error.message
        });
    }
}

const addProduct = async (req, res) => {
    try {
        let reqData = req.body;
        reqData.image = req.file.filename;

        let ckDup = await Product.find({
            "$or": [
                { name: slug(reqData.name, "-") },
                { slug: slug(reqData.name, "-") }
            ]
        })
        if (ckDup.length > 0) {
            res.status(200).json({
                status: false,
                msg: "Duplicate data found.",
                data: ckDup.length
            });
        }

        let product = new Product(reqData);
        product.slug = slug(reqData.name, "-");
        let result = await product.save();
        res.status(200).json({
            status: true,
            msg: "Product added.",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error.message
        });
    }
}

const getSingleProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Product.find({_id: productId});
        res.status(200).json({
            status: true,
            msg: "Product data.",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error.message
        });
    }
}

const delProduct = async (req, res) => {
    try {
        let productId = req.params.id;        
        let product = await Product.deleteOne({_id: productId});
        res.status(200).json({
            status: true,
            msg: "Product deleted.",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        let productData = req.body;
        let product = await Product.updateOne({_id: productId},{
                $set: {
                    name: productData.name,
                    price: productData.price,
                }
            });
        res.status(200).json({
            status: true,
            msg: "Product Updated.",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error.message
        });
    }
}


for (var index = 0; index <= 6; index++) {
    setTimeout(() => {
        console.log(index);
    }, 1000);
}

module.exports = {
    getProduct,
    addProduct,
    getSingleProduct,
    updateProduct,
    delProduct
}