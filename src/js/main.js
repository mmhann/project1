main = {


    mainTemplate: '',
    editTemplate: '',

    init: function() {
        main.mainTemplate = Handlebars.compile($('#main-template').html());
        main.editTemplate = Handlebars.compile($('#edit-note-template').html());
        main.loadHomeTemplate(data.initData);

        main.initStyle();
        main.changeStyle();


    },

    loadHomeTemplate: function(data) {
        var notes = main.getNotes();

        console.log('notes', notes);

        $('body').html(main.mainTemplate(data));
        main.initClickEvents();
    },

    loadEditTemplate: function(data) {
        $('body').html(main.editTemplate(data));
        main.initClickEvents();
    },

    initStyle: function() {
        var $body      = $('body'),
            colorTheme = localStorage.getItem("colorTheme");
        colorTheme === "2" ? $body.addClass('secondColorTheme') : $body.removeClass('secondColorTheme');
        $('.change-style-select').val(colorTheme);
    },

    changeStyle: function() {
        $('.change-style-select').change(function() {
            var $body = $('body');

            if ($(this).val() === '2') {
                $body.addClass('secondColorTheme');
                localStorage.setItem("colorTheme", "2");
            } else {
                $body.removeClass('secondColorTheme');
                localStorage.setItem("colorTheme", "1");
            }

        });
    },

    initClickEvents: function() {
        $('.create-button').on('click', function() {
            $(".grid-container").remove();

            main.loadEditTemplate(data.editData);
        });

        $('.button-save').on('click', function() {

            var title       = $('.edit-note-title input').val(),
                description = $('.edit-note-description textarea').val(),
                date        = $('.edit-note-date input').val(),
                noteJson    = {
                    title      : title,
                    description: description,
                    importance : main.importanceValue,
                    date : date
                };

            main.setNotes(noteJson);

            $(".edit-note-container").remove();
            main.loadHomeTemplate(data.initData);
        });

        $('.button-cancel').on('click', function() {
            $(".edit-note-container").remove();

            main.loadHomeTemplate(data.initData);
        });

        $('.edit-note-importance li').on('click', function(e) {
            main.importanceValue = $(e.target).val();
            $('.edit-note-importance li').removeClass('checked');


            for (var i = 0; i <= $(e.target).val(); i++) {
                $('.edit-note-importance [value="' + i + '"] ').addClass('checked');
            }
        })

    },

    getNotes: function() {
        return JSON.parse(localStorage.getItem("notes"));

    },

    setNotes: function(data) {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

$(document).ready(function() {
    main.init();
});