;(function(services, $) {
    const ajaxUtil = window.util.ajax;

    function createNote(title, description, importance, expirationDate) {
        return ajaxUtil.ajax("POST", "/notes/", {
            title         : title,
            description   : description,
            importance    : importance,
            expirationDate: expirationDate
        });
    }

    function updateNote(id, title, description, importance, expirationDate) {
        return ajaxUtil.ajax("POST", `notes/${id}`, {
            id            : id,
            title         : title,
            description   : description,
            importance    : importance,
            expirationDate: expirationDate
        });
    }

    function getNotes() {
        return ajaxUtil.ajax("GET", "/getAllNotes/", undefined);
    }

    function getFinishedNotes() {
        return ajaxUtil.ajax("GET", "/getAllFinishedNotes/", undefined);
    }

    function getNote(id) {
        return ajaxUtil.ajax("GET", `/notes/${id}`, undefined);
    }

    function finishNote(id, finished) {
        return ajaxUtil.ajax("POST", `/notes/finish/${id}`, {
            id      : id,
            finished: finished
        });
    }

    function deleteNote(id) {
        return ajaxUtil.ajax("DELETE", `/notes/${id}`, undefined);
    }

    services.restClient = {
        createNote,
        getNotes,
        getNote,
        updateNote,
        finishNote,
        getFinishedNotes,
        deleteNote
    };
}(window.services = window.services || {}, jQuery));