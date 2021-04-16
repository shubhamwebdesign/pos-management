import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './database/db.js';
import ErrorHandler from './middleware/errorHandler.js';
dotenv.config();

// routes //
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/usersRoute.js';
import productRoutes from './routes/productRoute.js';

const app = express();
connectDB();

// middlewares //
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes //
app.use('/api/auth', authRoutes);
app.use(ErrorHandler);
app.use('/api/users', userRoutes);
app.use(ErrorHandler);
app.use('/api/products', productRoutes);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `App is running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
      .bold
  )
);
