import { Router } from 'express';
import UserRouter from './Users';
import AuthRouter from './Auth';
import jwt from 'express-jwt';

const auth = jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', auth, UserRouter);
router.use('/auth', AuthRouter)

// Export the base-router
export default router;
