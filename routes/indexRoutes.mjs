import express from 'express';
import {notesController} from '../controller/notesController';

const router = express.Router();

router.get("/getAllNotes/", notesController.getNotes.bind(notesController));
router.post("/notes/", notesController.createNote.bind(notesController));
router.get("/notes/:id", notesController.getNote.bind(notesController));
router.post("/notes/:id", notesController.updateNote.bind(notesController));
router.post("/notes/finish/:id", notesController.finishNote.bind(notesController));
router.get("/getAllFinishedNotes/", notesController.getFinishedNotes.bind(notesController));

export const indexRoutes = router;