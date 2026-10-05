const express = require("express");

const productsRouter = require("./routes/products");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.use("/api/products", productsRouter);

module.exports = app;
