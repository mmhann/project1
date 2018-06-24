import {noteStore} from '../services/noteStore'

export class NotesController {
    async getNotes(req, res) {
        res.json(await noteStore.all(req));
    };

    async getFinishedNotes(req, res) {
        res.json(await noteStore.allFinished(req));
    };

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    }

    async createNote(req, res) {
        res.json(await noteStore.add(req.body.title, req.body.description, req.body.importance, req.body.expirationDate));
    };

    async updateNote(req, res) {
        res.json(await noteStore.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.expirationDate));
    }

    async finishNote(req, res) {
        res.json(await noteStore.finish(req.params.id, req.body.finished));
    }
}

export const notesController = new NotesController();