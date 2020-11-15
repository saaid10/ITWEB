import { Router } from 'express';
import UserRouter from './Users';
import AuthRouter from './Auth';
import ProgramsRouter from './Programs'
import {auth} from "@shared/functions";



// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', auth, UserRouter);
router.use('/auth', AuthRouter)
router.use('/programs', ProgramsRouter);

// Export the base-router
export default router;
