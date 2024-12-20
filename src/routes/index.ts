import * as express from "express";

// import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/authorization";
import invoice from './index.routes';

const router = express.Router();

// Public routes (No authentication or authorization required)
router.use('/invoice', invoice);


// Applying authentication middleware globally for all routes after this point!
// router.use(authMiddleware);



// Private routes (Protected by both auth and role-based authorization)


export { router };
