import {default as model} from './model.js';

;(function($) {
    const noteService        = new model.NoteService();
    const colorSchemeService = new model.ColorSchemeService();

    let noteTemplate     = null;
    let noteEditTemplate = null;

    Handlebars.registerHelper('times', function(n, block) {
        let accum = '';
        for (let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('importance', function(context) {
        let ret = '';
        for(let i=5; i > 0; --i) {
            ret += '<li class="material-icons importance ';
            ret += i <= context ? 'checked' : '';
            ret += '" value="' + i + '">whatshot</li>';
        }
        return ret;
    });

    function showNotes() {
        $('.notes').html(noteTemplate({note: noteService.note}));
    }

    function showEditTemplate(note) {
        $('.popup--content').html(noteEditTemplate(note));
    }

    function setColorScheme() {
        $('.change-style-select').val(colorSchemeService.colorScheme[0].value);
        $('body').addClass(colorSchemeService.colorScheme[0].value);
    }

    function updateUI() {
        showNotes();
        setColorScheme();
    }

    $(function() {
        noteTemplate     = Handlebars.compile($('#note-template').html());
        noteEditTemplate = Handlebars.compile($('#edit-note-template').html());

        function createButtonClick() {
            showEditTemplate();
        }

        function changeStyle(e) {
            let targetValue = $(e.target).val(),
                $body       = $('body');

            $body.removeClass();
            $body.addClass(targetValue);
            colorSchemeService.addColorScheme(targetValue);
        }

        function editImportance(e) {
            $('.edit-note-importance li').removeClass('checked');

            for (var i = 0; i <= $(e.target).val(); i++) {
                $('.edit-note-importance [value="' + i + '"] ').addClass('checked');
            }
        }

        function saveNote() {
            noteService.addNote(
                $('.edit-note-title input').val(),
                $('.edit-note-description textarea').val(),
                $('.importance.checked').length,
                $('.edit-note-date input').val()
            );
            updateUI();
        }

        function editNote(e) {
            let note = noteService.editNote($(e.target).val());
            showEditTemplate(note);
        }

        $(document).on('change', '.change-style-select', changeStyle);
        $(document).on('click', '.create-button', createButtonClick);
        $(document).on('click', '.edit-note-importance li', editImportance);
        $(document).on('click', '.button-save', saveNote);
        $(document).on('click', '.note-edit button', editNote);

        updateUI();
    });

})(jQuery);