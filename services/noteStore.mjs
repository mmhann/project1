// import {default as storage} from '/services/noteStorage.mjs';


// function sortingValues(key, order='asc') {
//     return function(a, b) {
//         if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//             return 0;
//         }
//
//         const varA = (typeof a[key] === 'string') ?
//             a[key].toUpperCase() : a[key];
//         const varB = (typeof b[key] === 'string') ?
//             b[key].toUpperCase() : b[key];
//
//         let comparison = 0;
//         if (varA > varB) {
//             comparison = 1;
//         } else if (varA < varB) {
//             comparison = -1;
//         }
//         return (
//             (order == 'desc') ? (comparison * -1) : comparison
//         );
//     };
// }
//
//
//
//
// class ColorScheme {
//     constructor(value) {
//         this.value = value;
//     }
//     toJSON() {
//         return {
//             value: this.value
//         };
//     }
//     static fromJSON(value) {
//         return new ColorScheme(value);
//     }
// }
//
// class ColorSchemeService {
//     constructor() {
//         let colorSchemeFromStorage = storage.getColorScheme();
//
//         if (colorSchemeFromStorage.length === 0) {
//             this.colorScheme = [ ];
//             this.colorScheme.push(new ColorScheme('simple'));
//             this.save();
//         }
//         else {
//             this.colorScheme = colorSchemeFromStorage;
//         }
//     }
//
//     addColorScheme(value) {
//         this.colorScheme = [ ];
//         this.colorScheme.push(new ColorScheme(value));
//         this.save();
//     }
//
//     save() {
//         storage.persist('colorScheme', this.colorScheme.map(f => f.toJSON()));
//     }
// }
//
// class NoteService {
//     constructor() {
//         let noteFromStorage = storage.getAllNotes();
//
//         if (noteFromStorage.length === 0) {
//             this.note = [ ];
//             this.note.push(new Note(0, "test1", 'test description', 3, '2017-06-01', '1529043536000', 0));
//             this.note.push(new Note(1, "test2", 'test description', 4, '2017-06-01', '1529043536000', 0));
//             this.note.push(new Note(2, "test3", 'test description', 5, '2017-06-01', '1529043536000', 1));
//             this.save();
//         }
//         else {
//             this.note = noteFromStorage.map((f, idx) => Note.fromJSON(idx, f));
//         }
//
//
//     }
//
//     addNote(title, description, importance, experationDate) {
//         this.note.push(new Note($('.note').length + 1, title, description, importance, experationDate, Date.parse(new Date()), 0));
//         this.save();
//     }
//
//     editNote(id) {
//         for (let i of this.note) {
//             if ( i.id == id ){
//                 return i;
//             }
//         }
//     }
//
//     updateNote(id, title, description, importance, experationDate) {
//         for (let i of this.note) {
//             if ( i.id == id ){
//                 i.title = title || 'unknwon';
//                 i.description = description ||'';
//                 i.importance = importance ;
//                 i.experationDate = experationDate;
//             }
//         }
//         this.save();
//     }
//
//     finishNote(id) {
//         for (let i of this.note) {
//             if ( i.id == id ){
//                 i.finished = 1;
//             }
//         }
//         console.log('this.note', this.note);
//
//         this.save();
//     }
//
//     filterNotes() {
//         this.note = storage.getAllFinishedNotes().map((f, idx) => Note.fromJSON(idx, f));
//         console.log('this.note', this.note);
//
//     }
//
//     sortingNotes(key, order) {
//         this.note.sortsort(sortingValues(key, order));
//     }
//
//
//
//     findByName(name) {
//         return this.note.findByName(name);
//     }
//
//     save() {
//
//         let noteFromStorage = storage.getAllNotes();
//         console.log('noteFromStorage', noteFromStorage);
//
//         for (let i of noteFromStorage) {
//             for (let j of this.note.map(f => f.toJSON())) {
//                 console.log('i', i);
//                 console.log('j', j);
//
//
//                 if (i.id == j.id) {
//                     // console.log('i', i);
//
//                 }
//             }
//         }
//
//         storage.persist('note', this.note.map(f => f.toJSON()));
//     }
//
// }


import Datastore from 'nedb-promise'

export class Note {
    constructor(title, description, importance, experationDate) {
        this.title          = title || 'unknwon';
        this.description    = description || '';
        this.importance     = importance;
        this.experationDate = experationDate;
        this.creationDate   = new Date();
        this.finished       = 0;
    }

    // toJSON() {
    //     return {
    //         id: this.id,
    //         title: this.title,
    //         description: this.description,
    //         importance: this.importance,
    //         experationDate:Date.parse(this.experationDate),
    //         creationDate:this.creationDate,
    //         finished: this.finished
    //     };
    // }
    // static fromJSON(id, obj) {
    //     return new Note(
    //         id, obj.title,
    //         obj.description,
    //         obj.importance,
    //         new Date(obj.experationDate).toISOString().substring(0, 10),
    //         obj.creationDate,
    //         obj.finished
    //     );
    // }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(title, description, importance, experationDate) {
        let note = new Note(title, description, importance, experationDate);
        return await this.db.insert(note);
    }

    async update(id, title, description, importance, experationDate) {
        await this.db.update({_id: id}, {
            $set: {
                "title"         : title,
                'description'   : description,
                'importance'    : importance,
                'experationDate': experationDate
            }
        });
        return await this.get(id);
    }


    async finish(id, finished) {
        await this.db.update({_id: id}, {
            $set: {
                'finished': finished
            }
        });
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.cfind({ 'finished': 0 }).exec();
    }

    async allFinished() {
        return await this.db.cfind({ 'finished': 1 }).exec();
    }


}

export const noteStore = new NoteStore();


/**
 * Exposed API facilities.
 */
// export default {NoteService, ColorSchemeService};