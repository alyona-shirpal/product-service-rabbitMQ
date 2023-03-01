const Router = require("express").Router;
const router = new Router();
const Product = require("../models/Product");
const amqp = require("amqplib");

let order; let channel; let connection;

// Connect to RabbitMQ
async function connectToRabbitMQ() {
    const amqpServer = "amqp://guest:guest@localhost:5673";

    connection = await amqp.connect(amqpServer);

    channel = await connection.createChannel();

    await channel.assertQueue("product-service-queue");
}
connectToRabbitMQ();

// Create a new product
router.post("/", async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            message: "Please provide name, price and description",
        });
    }

    const product = await new Product({ ...req.body });

    await product.save();

    return res.status(201).json({
        message: "Product created successfully",
        product,
    });
});


router.post("/buy", async (req, res) => {
    const { productIds } = req.body;

    const products = await Product.find({ _id: { $in: productIds } });

    // Send order to order queue;
    channel.sendToQueue(

        "order-service-queue",
        Buffer.from(
            JSON.stringify({
                products
            })
        )
    );


    channel.consume("product-service-queue", (data) => {
        console.log("Consumed from product-service-queue");

        order = JSON.parse(data.content);

        order.products.sort((a,b) => b.price - a.price);

        channel.ack(data);
    });


    return res.status(201).json({
        message: "Order placed successfully",
        order,
    });
});

module.exports = router;
