import express from 'express';
import usersRoute from './routes/usersRoute.ts';
import { registerRoute } from './routes/registerRoute.ts';
import { loginRoute } from './routes/loginRoute.ts';
import { dishesRoute } from './routes/dishesRoute.ts';
import { ordersRoute } from './routes/ordersRoute.ts';
import { verifyToken } from './middleware/verifyToken.ts';

import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: 'http://localhost:5500/index.html', // Be specific for security
  credentials: true // if sending cookies/auth headers
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/register', registerRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/users', verifyToken, usersRoute);
app.use('/api/v1/dishes', verifyToken, dishesRoute);
app.use('/api/v1/orders', verifyToken, ordersRoute);

app.listen(3000, () => {
	console.log('SERVER IS RUNNING VIA PORT 3000');
});
