import { Router } from 'express';

import { createUser } from '../controller/user.controller';
import { loginValidation, refreshValidation } from '../validation/auth';
import { UserLogin, UserLogout, UserRefresh } from '../controller/auth.controller';

const router = Router();

// user
router.post('/users', createUser);

// auth
router.post('/users/token', loginValidation, UserLogin);
router.delete('/users/token', refreshValidation, UserLogout);

// refresh
router.get('/users/token', UserRefresh);

export default router;
