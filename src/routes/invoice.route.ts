import { Router } from "express";
import { SendInvoice } from "../controllers/invoice.controller";

const router = Router();

router.post("/", SendInvoice);

export { router };
