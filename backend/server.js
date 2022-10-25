import express from 'express';
import bodyParser from 'body-parser';
import {authenticated, authMiddleware} from './middleware/auth.middleware.js';
import {hasRights} from "./middleware/permission.middleware.js";
import authRoutes from './routes/auth.routes.js';
import machineRoutes from './routes/machines.routes.js';
import userRoutes from './routes/user.routes.js';
import * as dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT;
export const app = express();

app.listen(port, () => console.log(`WashTrak is listening on ${port}!`));
app.use(bodyParser.json());
app.use(authMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/machines', authenticated, hasRights, machineRoutes);
app.use('/api/users', authenticated, hasRights, userRoutes);