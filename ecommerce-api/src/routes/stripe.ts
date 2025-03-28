import express from "express";
import {  } from "../controllers/productController.ts";
import { CreatePayment, getPaymentIdFromSessionId, Handlehooks } from "../controllers/stripeController.ts";
const router = express.Router();

router.post("/create-checkout-session", express.json(), CreatePayment);
router.post('/webhook', express.raw({ type: 'application/json' }), Handlehooks);
router.get('/session/:sessionId',express.json(),getPaymentIdFromSessionId)
export default router