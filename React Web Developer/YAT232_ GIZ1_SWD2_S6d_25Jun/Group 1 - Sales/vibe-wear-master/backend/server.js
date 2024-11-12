const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// File path for products.json
const filePath = path.join(__dirname, 'data', 'products.json');


// Check if products.json exists and is valid
console.log('Checking if products.json exists:', fs.existsSync(filePath));
if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    console.log('products.json contents:', fileContents);
    try {
        JSON.parse(fileContents);
        console.log('products.json contains valid JSON');
    } catch (error) {
        console.error('products.json contains invalid JSON:', error);
    }
} else {
    console.error('products.json does not exist');
}


// Function to read products from file
const readProductsFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error(`Failed to read products file: ${err.message}`));
            } else {
                try {
                    const products = JSON.parse(data);
                    resolve(products);
                } catch (parseError) {
                    reject(new Error(`Failed to parse products JSON: ${parseError.message}`));
                }
            }
        });
    });
};


// Function to write products to file
const writeProductsToFile = (products) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) {
                reject(new Error(`Failed to write to products file: ${err.message}`));
            } else {
                resolve();
            }
        });
    });
};

// Function to get the next ID ,Because i find problem : first id is always = null
const getNextId = async () => {
    const products = await readProductsFromFile(); // Read existing products
    if (products.length === 0) return 1; // Return 1 if no products exist
    const lastProduct = products[products.length - 1]; // Get the last product
    return lastProduct.id + 1; // Increment the ID
};

// GET endpoint to Read product
app.get('/api/products', async (req, res) => {
    try {
        const products = await readProductsFromFile();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET endpoint to Read specific product by id
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const products = await readProductsFromFile();
        const product = products.find(p => p.id === parseInt(id));
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error in /api/products/:id route:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST endpoint to add a new product
app.post('/api/products', async (req, res) => {
    const newProduct = req.body;

    // simple validation
    if (!newProduct.name || typeof newProduct.price !== 'number' || !newProduct.description) {
        return res.status(400).json({ error: 'Invalid product data. Please ensure all fields are provided.' });
    }

    try {
        const id = await getNextId();
        console.log('Generated ID:', id);
        const productToAdd = { id, ...newProduct };
        const products = await readProductsFromFile();
        products.push(productToAdd);
        await writeProductsToFile(products);
        res.status(201).json(productToAdd);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT endpoint to update a product
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;

    // simple validation
    if (!updatedProductData.name || typeof updatedProductData.price !== 'number' || !updatedProductData.description) {
        return res.status(400).json({ error: 'Invalid product data. Please ensure all fields are provided and valid.' });
    }

    try {
        const products = await readProductsFromFile();
        const productIndex = products.findIndex(p => p.id === parseInt(id, 10));

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }


        // Update the product
        products[productIndex] = { id: parseInt(id), ...updatedProductData };

        await writeProductsToFile(products); // Function to save the updated products back to the data source

        res.json(products[productIndex]); // Return the updated product
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const products = await readProductsFromFile();
        const index = products.findIndex(p => p.id === parseInt(id));

        if (index !== -1) {
            products.splice(index, 1); // Remove the product
            await writeProductsToFile(products);
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
