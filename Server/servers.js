import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cloudinarydb from './config/couldinary.js';
import UserRouter from './routes/userRoutes.js';
import ProductRouter from './routes/ProductRoutes.js';
import CartRouter from './routes/CartRoute.js';
import OrderRouter from './routes/orderRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;

//database connection
connectDB();
cloudinarydb();

//middlewares
app.use(cors());
app.use(express.json());

//api routes
app.use('/api/v1', UserRouter);
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/cart', CartRouter);
app.use('/api/v1/orders', OrderRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page of E-Commerce API');
});









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
