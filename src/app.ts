import express from 'express';
import login from './routes/login.route';
import order from './routes/order.route';
import products from './routes/product.route';
import users from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/products', products);
app.use('/users', users);
app.use('/orders', order);
app.use('/login', login);

export default app;
