import {login, listUsers} from '../controllers/auth.controller.js';
import * as express from 'express';

const router = express.Router()

router.post('/login', login)
router.post('/users', listUsers);

export default router