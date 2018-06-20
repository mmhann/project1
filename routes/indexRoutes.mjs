import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';

router.get("/getAllNotes/", notesController.getNotes.bind(notesController));
router.post("/notes/", notesController.createNote.bind(notesController));
router.get("/notes/:id", notesController.getNote.bind(notesController));
router.post("/notes/:id", notesController.updateNote.bind(notesController));
router.post("/notes/finish/:id", notesController.finishNote.bind(notesController));
router.get("/getAllFinishedNotes/", notesController.getFinishedNotes.bind(notesController));
// router.get("/:id/", ordersController.showOrder.bind(ordersController));
// router.delete("/:id/", ordersController.deleteOrder.bind(ordersController));

export const indexRoutes = router;