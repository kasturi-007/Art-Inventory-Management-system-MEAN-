const express = require('express');
const app = express();
const cors = require('cors');

const product = require('./productSchema');
const PORT = 3000;
app.use(cors());
app.use(express.json());

//create
app.post('/api/products', async (req, res) => {
    try{
        const prod = new product(req.body);
    await prod.save();
    res.status(201).json(prod);
    } catch (err) {
        res.status(400).json({message: err.message });
    } 
});
 
//get
app.get('/api/products', async (req, res) => {
    const products = await product.find();
    res.json(products);
});
//get by id 
app.get('/api/products/:id', async (req, res) => {
    try{
        const product1 = await product.findById(req.params.id);
        if (!product1) return res.json([]);
        return res.json([product1]);
    } catch {
        res.status(400).json([]);
    }
});
//update product
app.put('/api/products/:id', async (req, res) => {
    try{
        const updated = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//delete product
app.delete('/api/products/:id', async (req, res) => {
    try{
        await product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch {
        res.status(400).json({ message: 'Invalid ID' });
    }
});


app.listen(PORT, () => {
    console.log(`Backend Running on http://localhost:${PORT}`);
});