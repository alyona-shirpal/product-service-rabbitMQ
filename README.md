# Node.js API with RabbitMQ Integration

Node.js API with RabbitMQ Integration, an example project showcasing how Node.js integrates with RabbitMQ.
This API allows you to create products, buy them, and place orders. It uses MongoDB for data storage.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) (Node Package Manager) for managing dependencies.
- [Docker](https://www.docker.com/) for containerization (to run MongoDB and RabbitMQ).

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/alyona-shirpal/product-service-rabbitMQ.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd product-service-rabbitMQ
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

### Database Setup

1. **Run MongoDB container:**

    ```bash
    docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=docker -e MONGO_INITDB_ROOT_PASSWORD=mongopw mongo
    ```

   Adjust `docker`, `mongopw`, and `27017` with your preferred values.

2. **Connect to MongoDB:**

   Update the MongoDB connection configuration in `index.js`:

    ```javascript
    mongoose.connect('mongodb://docker:mongopw@localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Product service connected to MongoDB'))
    .catch((e) => console.log(e));
    ```

### RabbitMQ Setup

1. **Run RabbitMQ container:**

    ```bash
    docker run -d --name rabbitmq -p 5673:5673 -p 15673:15673 -e RABBITMQ_DEFAULT_USER=guest -e RABBITMQ_DEFAULT_PASS=guest rabbitmq:3-management
    ```

2. **Connect to RabbitMQ:**

   Update the RabbitMQ connection configuration in `routes/product.js`:

    ```javascript
    const amqpServer = "amqp://guest:guest@localhost:5673";
    ```

### Usage

1. **Run the development server:**

    ```bash
    npm run start
    ```

2. **API Endpoints:**

    - Create Product: `POST /product`
    - Buy Products: `POST /product/buy`

3. **Make API Requests:**

   Create a product:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"name":"Product1", "price": 10.99, "description": "A sample product"}' http://localhost:3001/product
    ```

   Buy products:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"productIds":["product_id_1", "product_id_2"]}' http://localhost:3001/product/buy
    ```

### Contributing

Feel free to contribute to the development of this project. Create a fork, make your changes, and submit a pull request.

