import { Router } from "express";
import { SendInvoice } from "../controllers/invoice.controller";

const router = Router();

router.get("/", SendInvoice);

export { router };
