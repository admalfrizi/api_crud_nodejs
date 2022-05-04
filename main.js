const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const db = require("./connect");
const { createProduct, allProducts, getProductId, editProduct, deleteProduct } = require("./controller");

db.connect();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());

app.get('/products/', allProducts);
app.post('/products/', createProduct);
app.get('/products/:id', getProductId);
app.put('/products/:id', editProduct);
app.delete('/products/:id', deleteProduct)

app.listen(5000, () => console.log('Server running at port 5000'));