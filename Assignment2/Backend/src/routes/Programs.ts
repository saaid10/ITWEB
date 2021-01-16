import {Router} from "express";
import programsController from "@controllers/programsController";
import {auth, authCredentialsNotRequired} from "@shared/functions";

const router: Router = Router();


router
    .route('/')
    .get(authCredentialsNotRequired, programsController.getPrograms)
    .post(auth, programsController.addNewProgram)

router
    .route('/:programId')
    .get(authCredentialsNotRequired, programsController.getProgram)
    .put(auth, programsController.updateProgram)
    .delete(auth, programsController.deleteProgram)

export default router;
