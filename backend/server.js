import express from 'express';
import bodyParser from 'body-parser';
import {authenticated, authMiddleware} from './middleware/auth.middleware.js';
import {hasRights} from "./middleware/permission.middleware.js";
import authRoutes from './routes/auth.routes.js';
import machineRoutes from './routes/machines.routes.js';

const port = 3000;
export const app = express();

app.listen(port, () => console.log(`WashTrak is listening on ${port}!`));
app.use(bodyParser.json());
app.use(authMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/machines', authenticated, hasRights, machineRoutes);