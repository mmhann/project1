/**
 * Food Storage
 */
let storage = readFromLocalStorage('note');
let colorScheme = readFromLocalStorage('colorScheme');

writeToLocalStorage('note', storage);

function getAllNotes() {
    return storage;
}

function getColorScheme() {
    return colorScheme;
}

function persist(name, toPersist) {
    storage = toPersist;
    writeToLocalStorage(name, storage);
}

function readFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || '[ ]');
}

function writeToLocalStorage(name, toPersist) {
    localStorage.setItem(name, JSON.stringify(toPersist));
}

/**
 * Exposed API facilities.
 */
export default { getAllNotes, persist, getColorScheme};