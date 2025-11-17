import express from 'express'
import { AiController } from '../controllers/ai.controller.js';
 const router = express.Router();

   router.post("/get-review",AiController)

export default router;