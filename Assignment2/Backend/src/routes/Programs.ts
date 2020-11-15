import {Router} from "express";
import programsController from "@controllers/programsController";
import {auth} from "@shared/functions";

const router: Router = Router();


router
    .route('/')
    .get(programsController.getPrograms)
    .post(auth, programsController.addNewProgram)

router
    .route('/:programId')
    .get(programsController.getProgram)
    .put(auth, programsController.updateProgram)
    .delete(auth, programsController.deleteProgram)

export default router;


