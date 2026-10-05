const express = require("express");

const router = express.Router();

const products = [
    {
        id: 1,
        name: "Laptop",
        description: "15 inch business laptop",
        price: 1200,
        stock: 10
    },
    {
        id: 2,
        name: "Monitor",
        description: "27 inch 4K monitor",
        price: 400,
        stock: 20
    },
    {
        id: 3,
        name: "Keyboard",
        description: "Mechanical keyboard",
        price: 100,
        stock: 50
    }
];


// GET /api/products
router.get("/", (req, res) => {
    res.json(products);
});


// GET /api/products/:id
router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            error: "Product not found"
        });
    }

    res.json(product);
});


module.exports = router;
