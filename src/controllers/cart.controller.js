import cartModel from '../models/cart.model.js';

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cart = await cartModel.findOne({_id: cartId});
        if(cart) res.status(200).send(cart);
        else res.status(404).send("Carrito no existe");
    }catch(e){
        res.status(500).render('templates/error', {e});
    }
}

export const createCart = async (req, res) => {
    try {
        const result = await cartModel.create({ products: [] });
        res.status(201).send(result);
    }catch(e){
        console.log(e);
        res.status(500).render('templates/error');
    }
}

export const insertProductCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;
        const cart = await cartModel.findOne({ _id: cartId });
        if( cart ) {
            const index = cart.products.findIndex(prod => prod._id == productId); // se puede usar find

            if(index != -1 ) {
                cart.products[index].quantity = quantity;
            } else {
                cart.products.push({id_prod: productId, quantity: quantity});
            }

            const result = await cartModel.findByIdAndUpdate(cartId, cart);
            return res.status(200).send(result);
        }else {
            res.status(404).send("Cart does not exists");
        }
    }catch(e){
        console.log(e);
        res.status(500).render('templates/error');
    }
}

export const updateProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid;
        const { newProduct } = req.body;
        const cart = await cartModel.findOne({_id: cartId});
        cart.products = newProduct;
        cart.save();
        res.status(200).send(cart);
    }catch(e){
        console.log(e);
        res.status(500).render('templates/error');
    }
}

export const updateQuantityProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;
        const cart = await cartModel.findOne({_id: cartId});
        if( cart ) {
            const index = cart.products.findIndex(prod => prod._id == productId);

            if(index != -1 ) {
                cart.products[index].quantity = quantity;
                cart.save();
                res.status(200).send(cart);
            } else {
                res.status(404).send("Product not found");
            }
        }else {
            res.status(404).send("Cart does not exists");
        }
    }catch(e){
        console.log(e);
        res.status(500).render('templates/error');
    }
}

export const deleteProductCart = async (req,res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartModel.findOne({ _id: cartId });
        if(cart) {
            const index = cart.products.findIndex(prod => prod._id == productId);

            if(index != -1 ) {
                cart.products.splice(index, 1);
                cart.save();
                res.status(200).send(cart);
            } else {
               res.status(404).send("Product not found");
            }

        }else {
            res.status(404).send("Cart does not exists");
        }
    }catch(e){
        console.log(e);
        res.status(500).render('templates/error');
    }
}

export const deleteCart = async (req,res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findOne({_id: cartId});
        if(cart ){
            cart.products = [];
            cart.save();
            res.status(200).send(cart);
        } else {
            res.status(404).send("Cart does not exists");
        }
    }catch(e){
        console.log(e);
        res.status(500).render('templates/error');
    }
}