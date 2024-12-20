import fs from 'fs';
import path from 'path';
import express from "express";

import { router as indexRoute } from "../routes/invoice.route";

const router: express.Router = express.Router();


// Invoice
router.use('/send', indexRoute)

export default router;
