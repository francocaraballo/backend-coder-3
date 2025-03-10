import productModel from "../models/product.model.js";

export const getProducts = async ( req, res ) => {
    try {
        // 1. Extraer y validar parámetros de la consulta
        const { limit = 10, page = 1, metFilter, filter, metOrder, ord } = req.query;

        // 2. Construir el objeto de filtrado
        const filterQuery = metFilter && filter ? { [metFilter]: filter } : {};

        // 3. Construir el objeto de ordenación
        const sortOptions = metOrder && ord ? { [metOrder]: ord === 'asc' ? 1 : -1 } : {};

        // 4. Opciones de paginación
        const options = {
            limit: parseInt(limit, 10), // Asegurar que sea un número
            page: parseInt(page, 10),  // Asegurar que sea un número
            sort: sortOptions,
            lean: true,
        };

        // 5. Obtener productos paginados
        const products = await productModel.paginate(filterQuery, options);

        // 6. Generar números de página para la vista
        products.pageNumbers = Array.from({ length: products.totalPages }, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === products.page,
        }));
        const user = req.user?.toObject() || null;
        const isAdmin = req.user?.role === 'admin' || false;
        res.status(200).render('templates/home', { products, user, isAdmin });
        
    } catch(e) {
        console.error(e);
        res.status(500).render('templates/error');
    }
}

export const getProduct = async ( req, res ) => {
    try {
        const idProduct = req.params.pid;
        const product = await productModel.findById(idProduct);

        if(!product) return res.status(404).json({ status: "error", message: "Product not found"});

        const productParse = product.toObject();
        return res.status(200).render('templates/productDetails', { product: productParse });
    } catch(e) {
        console.log(e);
        res.status(500).render('templates/error', {e});
    }
}

export const createProduct = async ( req, res ) => {
    try {
        const { title, 
            description, 
            category, 
            status, 
            price, 
            stock, 
            code, 
            thumbnail } = req.body;
        
            const product = { title, 
            description, 
            category, 
            status, 
            price, 
            stock, 
            code, 
            thumbnail };
        
        if(!title || !description || !category || !status || !price || !stock || !code || !thumbnail) {
            return res.status(400).json({ status: "error", message: "Incompletes fields"});
        }
        const result = await productModel.create(product);
        res.status(201).json({ status: "success", message: "Product created"});
    }catch(e) {
        console.log(e);
        res.status(500).render('templates/error');
    }
}

export const updateProduct = async ( req, res ) => {
    try {
        const idProd = req.params.pid;
        const updateProduct = req.body;
        const result = await productModel.findByIdAndUpdate(idProd, updateProduct);

        if(!result) return res.status(404).json({ status: "error", message: "Product not found"});
        return res.status(200).json({ status: "success", message: "Product updated", id: idProd });
    }catch(e) {
        console.log(e);
        res.status(500).render('templates/error', {e});
    }
}

export const deleteProduct = async ( req, res ) => {
    try {
        const idProd = req.params.pid;
        const result = await productModel.findByIdAndDelete(idProd);
        if (result) return res.status(200).json({ status: "success", message: "Product deleted", id: idProd });
        return res.status(404).json({ status: "error", message: "Product not found"});
    } catch(e) {
        console.log(e);
        res.status(500).render('templates/error', { e });
    }
}