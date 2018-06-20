/**
 * Food Storage
 */
let storage = readFromLocalStorage('note');
let colorScheme = readFromLocalStorage('colorScheme');

writeToLocalStorage('note', storage);

function getAllNotes() {
    let note = [];
    for (let i of storage) {
        if ( i.finished === 0 ){
            note.push(i);
        }
    }
    return note;
}

function getAllFinishedNotes() {
    let note = [];
    for (let i of storage) {
        if ( i.finished === 1 ){
            note.push(i);
        }
    }
    return note;
}

function getColorScheme() {
    return colorScheme;
}

function persist(name, toPersist) {
    storage = toPersist;
    writeToLocalStorage(name, storage);
}

function readFromLocalStorage(name) {
    // return JSON.parse(localStorage.getItem(name) || '[ ]');
}

function writeToLocalStorage(name, toPersist) {
    // localStorage.setItem(name, JSON.stringify(toPersist));
}

/**
 * Exposed API facilities.
 */
// export default { getAllNotes, getAllFinishedNotes, persist, getColorScheme};
export class ValueStorage {

}

export const valueStorage = new ValueStorage();