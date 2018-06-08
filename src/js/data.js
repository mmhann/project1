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



//
//
// data =  {
//     initData: {
//         noteButton         : "Create new Note",
//         changeStyleDropdown: [
//             {
//                 name : 'Simple-Style',
//                 value: 1
//             },
//             {
//                 name : 'Color-Style',
//                 value: 2
//             }
//         ],
//         navButtonList      : [
//             {
//                 name: 'By finish Date',
//             },
//             {
//                 name: 'By created Date'
//             },
//             {
//                 name: 'By Importance'
//             }
//         ],
//         finishedButton     : 'Show finished'
//     },
//
//     editData: {
//         title: 'Title'
//     },
//
//     notes:{
//
//     }
// }
//
