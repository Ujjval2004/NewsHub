import express from "express";
import { downloadNotesTxt } from "../controllers/notesController.js";

const router = express.Router();

router.post("/download/txt", downloadNotesTxt);

export default router;