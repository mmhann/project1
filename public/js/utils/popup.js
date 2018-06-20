
$(document).on('click', '.open--popup', function() {
    $('#popup').css('display', 'block');
});

$(document).on('click', '.close, .button-cancel', function() {
    $('#popup').css('display', 'none');
});

window.onclick = function(event) {
    if ($(event.target).attr('id') == $('#popup').attr('id')) {
        $('#popup').css('display', 'none');
    }
}