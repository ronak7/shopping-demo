const Cart = require('./../models/Cart');

const addToCart = async (req, res) => {
    try {
        let reqData = req.body
        let cartData = await Cart.find()
        if (cartData.length == 0) {
            let cart = new Cart();
            await cart.products.push({
                productId: reqData._id,
                name: reqData.name,
                price: reqData.price,
                image: reqData.image,
                qty: reqData.qty,
                total: reqData.price * reqData.qty
            });
            cart.subtotal = cart.products.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
            cart.user = 1;
            let result = await cart.save();
            res.status(200).json({
                status: true,
                msg: "Cart added.",
                data: result
            });
        } else {
            let cdata = await Cart.findOne({user:1});
            let findkey = cdata.products.findIndex(el => el.productId == reqData._id)
            if (findkey >= 0) {
                if (reqData.fromprodList && reqData.fromprodList == true) {
                    reqData.qty = cdata.products[findkey].qty + 1
                }
                cdata.products[findkey].price = reqData.price;
                cdata.products[findkey].qty = reqData.qty;
                cdata.products[findkey].name = reqData.name;
                cdata.products[findkey].image = reqData.image;
                cdata.products[findkey].total = reqData.price * reqData.qty;
                cdata.subtotal = cdata.products.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
                await cdata.save();
                res.status(200).json({
                    status: true,
                    msg: 'Cart update',
                    data: cdata
                });
            } else {
                let cdata = await Cart.findOne({ user: 1 });
                reqData.qty = 1;
                cdata.products.push({
                    productId: reqData._id,
                    name: reqData.name,
                    image: reqData.image,
                    price: reqData.price,
                    qty: reqData.qty,
                    total: reqData.price * reqData.qty
                });
                cdata.subtotal = cdata.products.map(item => item.total).reduce((prev, curr) => prev + curr, 0);

                let result = await cdata.save();
                res.status(200).json({
                    status: true,
                    msg: "Update added.",
                    data: result
                });
            }
            
        }
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Error.",
            data: error.message
        });
    }
}

const getAddedCartData = async (req, res) => {
    try {
        let cart = await Cart.find().exec();
        res.status(200).json({
            status: true,
            msg: "Cart data.",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error
        });
    }
}

const deleteCartProduct = async (req, res) => {
    try {
        let cart = await Cart.updateMany(
            { _id: req.params.cartid},
            { $pull: { products: { productId: req.params.productid } } },
        );
        let cdata = await Cart.findOne({ _id: req.params.cartid });
        if (cdata && cdata.products.length == 0) {
            cdata.subtotal = 0
        }else {
            cdata.subtotal = cdata.products.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
        }
        let result = await cdata.save();

        res.status(200).json({
            status: true,
            msg: "Data deleted",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error.message
        });
    }
}

const addQtyCartProduct = async (req, res) => {
    try {
        // console.log(req.params);
        // let cart = await Cart.updateOne(
        //     { _id: req.params.cartid, "priducts.productId": req.params.productid },
        //     { $set: { "products.$.qty": req.params.newQty } }
        // );
        let reqData = {};
        let cdata = await Cart.findOne({ _id: req.params.cartid });
        let findkey = cdata.products.findIndex(el => el.productId == req.params.productid)
            // if (reqData.fromprodList && reqData.fromprodList == true) {
                reqData.qty = +req.params.newQty;
            // }
            cdata.products[findkey].qty = reqData.qty;
            cdata.products[findkey].total = cdata.products[findkey].price * reqData.qty;
            cdata.subtotal = cdata.products.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
            await cdata.save();
        res.status(200).json({
            status: true,
            msg: "Data updated",
            data: cdata
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Something is wrong.",
            data: error.message
        });
    }
}

module.exports = {
    addToCart,
    getAddedCartData,
    deleteCartProduct,
    addQtyCartProduct
}