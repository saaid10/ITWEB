import {Router} from 'express';
import {loginChecker, registrationChecker} from "./middleware";
import {AuthController} from "@controllers/AuthController";

const router = Router();


/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

router.post('/login', loginChecker, AuthController.login);


/******************************************************************************
 *                      Registration - "GET /api/auth/registration"
 ******************************************************************************/

router.post('/registration', registrationChecker, AuthController.registration);


/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
