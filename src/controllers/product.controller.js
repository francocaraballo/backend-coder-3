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
        res.status(200).render('templates/home', { products, user });
        
    } catch(e) {
        console.error('Error fetching products: ', e);
        res.status(500).render('templates/error', { error: 'Internal Server Error' });
    }
}

export const getProduct = async ( req, res ) => {
    try {
        const idProduct = req.params.pid;
        const product = await productModel.findById(idProduct);
        if (product)
            res.status(200).render('templates/product', { prod: product });
        else
            res.status(404).render('templates/error', {e: "Producto no encontrado"});
    } catch(e) {
        console.log(e);
        res.status(500).render('templates/error', {e});
    }
}

export const createProduct = async ( req, res ) => {
    try {
        const product = req.body;
        const result = await productModel.create(product);
        res.status(201).send("Product created");
    }catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export const updateProduct = async ( req, res ) => {
    try {
        const idProd = req.params.pid;
        const updateProduct = req.body;
        const result = await productModel.findByIdAndUpdate(idProd, updateProduct);

        if (result) res.status(200).redirect('templates/home', { result });
        else res.status(404).render('templates/error', {e: "Product not found"});
    }catch(e) {
        console.log(e);
        res.status(500).render('templates/error', {e});
    }
}

export const deleteProduct = async ( req, res ) => {
    try {
        const idProduct = req.params.pid;
        const result = await productModel.findByIdAndDelete(idProduct);
        if (result) res.status(200).redirect('templates/home', { result });
        else res.status(404).render('templates/error', {e: "Product not found"});
    }catch(e) {
        res.status(500).render('templates/error', {e});
    }
}