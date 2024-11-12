const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const router = require('./product.route/product.route');
const routeruser = require('../FinalBackEnd/users.route/user.route');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/product', router);
app.use('/user', routeruser);



mongoose.connect(process.env.MONGO_URI, { 
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((error) => {
    console.error('Connection error:', error);
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
