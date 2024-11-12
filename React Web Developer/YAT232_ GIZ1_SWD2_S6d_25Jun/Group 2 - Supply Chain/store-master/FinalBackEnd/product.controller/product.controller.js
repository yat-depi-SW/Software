const Product = require('../product.scheme/product.scheme');
const CartItemModel = require('../cart.scheme');  
const Order = require('../order.scheme');  

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    const cartItem = new CartItemModel({
        user: userId,
        productItem: productId,
        quantity
});

try {
        await cartItem.save();
        res.status(201).json({ message: "Product added to cart successfully", cartItem });
} catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
}
};

const createOrder = async (req, res) => {
    const { cartItems, totalPrice, status } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart items are required.' });
    }
    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
        return res.status(400).json({ message: 'Total price must be a positive number.' });
    }
    if (!status || !['success', 'failed'].includes(status)) {
        return res.status(400).json({ message: 'Status must be either "success" or "failed".' });
    }

    const order = new Order({
        cartItems,
        totalPrice,
        status
    });

    try {
        await order.save(); 
        await CartItemModel.deleteMany({ _id: { $in: cartItems } });
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    addToCart,
    createOrder  
};
