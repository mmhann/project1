import {default as storage} from './data.js';

class Note {
    constructor(id, title, description, importance, date) {
        this.id = id;
        this.title = title || 'unknwon';
        this.description = description ||'';
        this.importance = importance ;
        this.date = date;
    }
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            importance: this.importance,
            date:this.date
        };
    }
    static fromJSON(id, obj) {
        return new Note(id, obj.title, obj.description, obj.importance, obj.date);
    }
}

class ColorScheme {
    constructor(value) {
        this.value = value;
    }
    toJSON() {
        return {
            value: this.value
        };
    }
    static fromJSON(value) {
        return new ColorScheme(value);
    }
}

class ColorSchemeService {
    constructor() {
        let colorSchemeFromStorage = storage.getColorScheme();

        if (colorSchemeFromStorage.length === 0) {
            this.colorScheme = [ ];
            this.colorScheme.push(new ColorScheme('simple'));
            this.save();
        }
        else {
            this.colorScheme = colorSchemeFromStorage;
        }
    }

    addColorScheme(value) {
        this.colorScheme = [ ];
        this.colorScheme.push(new ColorScheme(value));
        this.save();
    }

    save() {
        storage.persist('colorScheme', this.colorScheme.map(f => f.toJSON()));
    }
}

class NoteService {
    constructor() {
        let noteFromStorage = storage.getAllNotes();

        if (noteFromStorage.length === 0) {
            this.note = [ ];
            this.note.push(new Note(0, "test1", 'test description', 3, '2017-06-01'));
            this.note.push(new Note(1, "test2", 'test description', 4, '2017-06-01'));
            this.note.push(new Note(2, "test3", 'test description', 5, '2017-06-01'));
            this.save();
        }
        else {
            this.note = noteFromStorage.map((f, idx) => Note.fromJSON(idx, f));
        }


    }

    addNote(title, description, importance, date) {
        this.note.push(new Note($('.note').length + 1, title, description, importance, date ));
        this.save();
    }

    editNote(id) {
        for (let i of this.note) {
            if ( i.id == id ){
                return i;
            }
        }
    }
    
    findByName(name) {
        return this.note.findByName(name);
    }

    save() {
        storage.persist('note', this.note.map(f => f.toJSON()));
    }

    orderNoteById(foodId, callback) {
        let toOrder = this.food[foodId];
        if (toOrder) {
            setTimeout(
                () => {
                    toOrder.amount += toOrder.amountPerDelivery;
                    this.save();

                    if (typeof(callback) === 'function') {
                        callback();
                    }
                }, 2000);
        }
    }
}



/**
 * Exposed API facilities.
 */
export default {NoteService, ColorSchemeService};