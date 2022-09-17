import { Router } from 'express';

import { createUser } from '../controller/user.controller';

const router = Router();

// user
router.post('/users', createUser);

export default router;
