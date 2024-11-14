const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

const dbProducts = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'products',
});
const dbOrders = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'shop',
});

dbProducts.connect(error => {
        if(error)
        {
        console.error("Error connecting to MySQLLLLLL products", error);
        }
        else
        console.log("Connected to MySQL");
    }
)
dbOrders.connect(error => {
    if(error)
    {
    console.error("Error connecting to MySQLLLL shöpp", error);
    }
    else
    console.log("Connected to MySQL");
}
)

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
  
    dbProducts.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from database:', err);
        return res.status(500).send('Server error');
      }
  
      res.json(results);
    });
});

app.post('/checkout', (req, res) => {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty or invalid.' });
    }
    let orderid = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

    const orderQuery = 'INSERT INTO orders (order_id, product_id, quantity, price, totalAmount) VALUES ?';

    const orderValues = cart.map(item => [
        orderid,
        item.id,
        item.quantity,
        item.price,
        item.price * item.quantity
    ]);
    
    dbOrders.query(orderQuery, [orderValues], (err, result) => {
        if (err) {
            console.error('Error inserting orders:', err);
            res.status(500).send('Error placing order');
        } else {
            console.log('Order placed successfully:', result);
            res.status(200).json({
                success: true,
                message: 'Checkout successful'
            });
        }
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });