Handlebars.registerHelper('times', function(n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('importance', function(context) {
    let ret = '';
    for (let i = 5; i > 0; --i) {
        ret += '<li class="material-icons importance ';
        ret += i <= context ? 'checked' : '';
        ret += '" value="' + i + '">flash_on</li>';
    }
    return ret;
});

Handlebars.registerHelper('formatDate', function(data) {
    return moment(data, moment.ISO_8601).fromNow();
});