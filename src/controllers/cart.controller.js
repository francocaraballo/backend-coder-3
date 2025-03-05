import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';
import ticketModel from '../models/ticket.model.js';
import userModel from '../models/user.model.js';

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findOne({_id: cartId});
        if(cart) res.status(200).json(cart);
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

export const purchaseCart = async (req,res) => {
   try {
    const { cid } = req.params;
    const cart = await cartModel.findOne({ _id: cid });
    const user = await userModel.findOne({ cart: cid })
    const cartProducts = cart.products;

    const productsOut = await verifyStock( cart ); // Me devuelve en array con los id de los productos que no cuentan con stock
    
    // Obtenemos el array de los productos que si van a continuar con el proceso de compra
    const productsToBuy = cartProducts.filter(product => {
        for(const productOut of productsOut) {
            return product.id_prod._id !== productOut;
        }
    });
    const stocksUpdated = await updateStock( productsToBuy );
    const ticket = await createTicket( productsToBuy, user.email);

    return res.status(200).json({ status: 'success', message: 'Purchase successfully', ticket, productsUnavaible: productsOut});
} catch (e) {
    console.log(e);
}
}
// if(productsOut.length != 0) return res.status(400).json({ productsOutStock: productsOut });

const verifyStock = async ( cart ) =>  {
    try {
        const { products } = cart;
        const productsOutStock = [];

        for (const productCart of products) {
            const prodDB = await productModel.findById({ _id: productCart.id_prod._id });

            const diffQuantity = prodDB.stock - productCart.quantity
            if(diffQuantity < 0) {
                const idProductOutStock = productCart.id_prod._id
                productsOutStock.push(idProductOutStock);
            } 
        }
        
        return productsOutStock;

    } catch (e) {
        console.log(e);
    }
}

const updateStock = async ( products ) => {
    const productsStockUpdated = [];
    try {
        for (const productCart of products) {
            const prodDB = await productModel.findById({ _id: productCart.id_prod._id });

            const newStock = prodDB.stock - productCart.quantity;
                prodDB.stock = newStock;
                prodDB.save();
                productsStockUpdated.push({
                    id: productCart.id_prod._id,
                    stock: newStock
                })
        }
        
        return productsStockUpdated;

    } catch (e) {
        console.log(e);
    }
}

const calculateTotalAmount = ( cart ) => {
    let totalAmout = 0;
    cart.forEach(product => {
        const { quantity } = product;
        const { price } = product.id_prod;

        totalAmout+= quantity * price;
    });
    return totalAmout;
}

const createTicket = async ( cart, userEmail ) => {
    const total = calculateTotalAmount(cart);
    const date = new Date();

    const ticket = {
        code: crypto.randomUUID(),
        purchase_datetime: date,
        amount: total,
        purchaser: userEmail
    }
    const data = await ticketModel.create( ticket );

    return data;
}