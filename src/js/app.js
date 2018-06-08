import {default as model} from './model.js';

;(function($) {
    const noteService = new model.NoteService();
    const colorSchemeService = new model.ColorSchemeService();

    let noteTemplate = null;
    let noteEditTemplate = null;

    Handlebars.registerHelper('times', function(n, block) {
        let accum = '';
        for(let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });
    
    function showNotes() {
        $('.notes').html(noteTemplate({ note: noteService.note }));
    }

    function showEditTemplate() {
        $('.popup--content').html(noteEditTemplate({ note: noteService.note }));
    }

    function setColorScheme() {
        $('.change-style-select').val(colorSchemeService.colorScheme[0].value);
        $('body').addClass(colorSchemeService.colorScheme[0].value);
    }
    
    function updateUI() {
        showNotes();
        setColorScheme();
    }

    $(function () {
        noteTemplate =  Handlebars.compile($('#note-template').html());
        noteEditTemplate = Handlebars.compile($('#edit-note-template').html());

        function createButtonClick() {
            showEditTemplate();
        }

        $(document).on('change', '.change-style-select', function(e) {
            let targetValue = $(e.target).val(),
                $body = $('body');

            $body.removeClass();
            $body.addClass(targetValue);
            colorSchemeService.addColorScheme(targetValue);
        });
        
        $(document).on("click", '.create-button', createButtonClick);

        $(document).on('click', '.edit-note-importance li', function(e) {
            // main.importanceValue = $(e.target).val();
            $('.edit-note-importance li').removeClass('checked');


            for (var i = 0; i <= $(e.target).val(); i++) {
                $('.edit-note-importance [value="' + i + '"] ').addClass('checked');
            }
        });

        $(document).on( 'click', '.button-save', function() {
            noteService.addNote(
                $('.edit-note-title input').val(),
                $('.edit-note-description textarea').val(),
                $('.importance.checked').length,
                $('.edit-note-date input').val()
            );
            updateUI();
        });

        updateUI();
    });

})(jQuery);