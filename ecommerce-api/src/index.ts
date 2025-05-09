import cors from 'cors'
import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./config/db";
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import stripeRouter from "./routes/stripe";

dotenv.config();
const app = express();
// Middleware
app.use(cors())

app.use('/stripe',stripeRouter)
app.use(express.json())
// Router
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
