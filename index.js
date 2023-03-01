const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const productRouter = require('./routes/product');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product', productRouter);

mongoose.connect('mongodb://docker:mongopw@localhost:55002', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Product service connected to Mongo db'))
    .catch((e) => console.log(e));


app.listen(PORT, () => {
    console.log(`Product service listening on port ${PORT}`);
});

