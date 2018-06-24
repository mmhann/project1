;(function($) {
    moment.locale('de');

    const client       = window.services.restClient;
    const valueStorage = window.services.valueStorage;
    const colorScheme  = 'colorScheme';

    let noteTemplate      = null;
    let noteEditTemplate  = null;
    let importanceOrder   = false;
    let finishDateOrder   = false;
    let creationDateOrder = false;

    function showEditTemplate(note) {
        if (note) {
            note.edit = true;
        }
        $('.popup-content').html(noteEditTemplate(note));
    }

    function getColorScheme() {
        let $body                  = $('body'),
            colorSchemeFromStorage = valueStorage.getItem(colorScheme);

        if (colorSchemeFromStorage) {
            $body.removeClass();
            $body.addClass(colorSchemeFromStorage);
            $('.change-style-select').val(colorSchemeFromStorage);
        }
        else {
            $body.addClass('simple');
        }
    }

    $(function() {
        noteTemplate     = Handlebars.compile($('#note-template').html());
        noteEditTemplate = Handlebars.compile($('#edit-note-template').html());

        function createButtonClick() {
            showEditTemplate();
        }

        function changeColorScheme(e) {
            let targetValue = $(e.target).val(),
                $body       = $('body');

            $body.removeClass();
            $body.addClass(targetValue);
            valueStorage.setItem(colorScheme, targetValue);
        }

        function editImportance(e) {
            $('.edit-note-importance li').removeClass('checked');

            for (var i = 0; i <= $(e.target).val(); i++) {
                $('.edit-note-importance [value="' + i + '"] ').addClass('checked');
            }
        }

        function saveNote() {
            client.createNote(
                $('.edit-note-title input').val(),
                $('.edit-note-description textarea').val(),
                $('.importance.checked').length,
                $('.edit-note-date input').val()
            ).done(function(msg) {
                $('#popup').css('display', 'none');
                renderNotes();
            }).fail(function(msg) {
                //nothing!
            });
            event.preventDefault();
        }

        function editNote(e) {
            client.getNote($(e.target).val()).done(function(note) {
                showEditTemplate(note);
            });
        }

        function finishNote(e) {
            console.log('$(e.target).is(:checked)', $(e.target).is(':checked'));

            client.finishNote(
                $(e.target).closest('.note').attr('value'),
                $(e.target).is(':checked') ? 1 : 0
            ).done(function() {
                $(e.target).is(':checked') ? renderNotes() : renderFinishedNotes();
            });
        }

        function updateNote(e) {
            client.updateNote(
                $(e.target).val(),
                $('.edit-note-title input').val(),
                $('.edit-note-description textarea').val(),
                $('.importance.checked').length,
                $('.edit-note-date input').val()
            ).done(function(msg) {
                $('#popup').css('display', 'none');
                renderNotes();
            }).fail(function(msg) {
                //nothing!
            });
            event.preventDefault();
        }

        function orderByImportance() {
            importanceOrder = !importanceOrder;
            orderNotes('importance', importanceOrder ? 'desc' : 'asc');
        }

        function orderByFinishDate() {
            finishDateOrder = !finishDateOrder;
            orderNotes('expirationDate', finishDateOrder ? 'asc' : 'desc');
        }

        function orderByCreationDate() {
            creationDateOrder = !creationDateOrder;
            orderNotes('creationDate', creationDateOrder ? 'desc' : 'asc');
        }

        function orderNotes(key, order) {
            client.getNotes().done(function(notes) {
                notes.sort(sortingValues(key, order));
                $('.notes').html(noteTemplate({notes: notes}));
                $('.nav--button--toggleFinished').removeClass('nav--button--toggleFinished').addClass('nav--button--finished').html('Show finished notes');
            })
        }

        function renderNotes() {
            client.getNotes().done(function(notes) {
                $('.notes').html(noteTemplate({notes: notes}));
            })
        }

        function renderFinishedNotes() {
            client.getFinishedNotes().done(function(notes) {
                $('.notes').html(noteTemplate({notes: notes}));
            })
        }

        function toggleFinishedNotes(e) {
            if ($(e.target).hasClass('nav--button--finished')) {
                $(e.target).removeClass('nav--button--finished').addClass('nav--button--toggleFinished').html('Show current notes');
                renderFinishedNotes();
            } else {
                $(e.target).removeClass('nav--button--toggleFinished').addClass('nav--button--finished').html('Show finished notes');
                renderNotes();
            }
        }

        $(document).on('change', '.change-style-select', changeColorScheme);
        $(document).on('click', '.nav--button--importance', orderByImportance);
        $(document).on('click', '.nav--button--finish', orderByFinishDate);
        $(document).on('click', '.nav--button--created', orderByCreationDate);
        $(document).on('click', '.note-finish-checkbox input', finishNote);
        $(document).on('click', '.nav--button--finished', toggleFinishedNotes);
        $(document).on('click', '.nav--button--toggleFinished', toggleFinishedNotes);
        $(document).on('click', '.button-save', saveNote);
        $(document).on('click', '.note-edit button', editNote);
        $(document).on('click', '.create-button', createButtonClick);
        $(document).on('click', '.button-update', updateNote);
        $(document).on('click', '.edit-note-importance li', editImportance);

        renderNotes();
        getColorScheme();
    });

})(jQuery);