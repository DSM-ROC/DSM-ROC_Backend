import { Router } from 'express';

import { createUser } from '../controller/user.controller';
import { UserLogin, UserLogout, UserRefresh } from '../controller/auth.controller';

const router = Router();

// user
router.post('/users', createUser);

// auth
router.post('/users/token', UserLogin);
router.delete('/users/token', UserLogout);

// refresh
router.get('/users/token', UserRefresh);

export default router;
