import {Response, Router} from 'express';
import StatusCodes from 'http-status-codes';

import {IRequest} from '@shared/constants';

const router = Router();
const {OK} = StatusCodes;


/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

router.post('/login', (req: IRequest, res: Response) => {
    res.status(OK);
});


/******************************************************************************
 *                      Registration - "GET /api/auth/registration"
 ******************************************************************************/

router.get('/registration', (req: IRequest, res: Response) => {
    res.status(OK);
});


/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
