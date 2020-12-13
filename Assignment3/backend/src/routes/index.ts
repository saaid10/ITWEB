import HighScoreController from '@controllers/HighScoreController';
import HighScoreRouter from './Highscore'
import { Router } from 'express';
import AuthRouter from './Auth';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);
router.use('/highscore', HighScoreRouter);
// Export the base-router
export default router;
