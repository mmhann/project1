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

Handlebars.registerHelper('formatDate', function (data) {
    let options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: true
    };
    return new Date(data).toLocaleString('de-DE', options); //ES6
});

// Handlebars.registerHelper('ifCond', function(value, block) {
//     console.log('note', note);
//     console.log('block', block);
//     console.log('this', this);
//     console.log('block.fn(this)', block.fn(this));
//
//     console.log('block.inverse(this)', block.inverse(this));
//
//     if (value === 0) {
//         block.fn(this)
//     }
//
//
//     // if (v1 ==) {
//     //     return block.fn(this);
//     // }
//     // return block.inverse(this);
//         });
