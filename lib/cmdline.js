#!/usr/bin/env node

var YUI = require('yui3').YUI;

var timer = setTimeout(function() {
    if (html === '') {
        console.log('No input received..');
        process.exit(1);
    }
}, 2000);

var stdin = process.openStdin(),
    html = '';

stdin.setEncoding('utf8');
stdin.on('data', function(data) {
    html += data;
});
stdin.on('end', fireYUI);


function fireYUI() {
    clearTimeout(timer);
    var args = process.argv.slice(2);
    //console.log(args);
    YUI({ logInclude: { cli: true } ,  debug: true }).use('node', function(Y) {
        if (html.indexOf('<body') === -1) {
            //No Body, append to body
            Y.one('body').append(html);
        } else if (html.indexOf('<html') > -1) {
            //This is an HTML doc
            Y.one('doc').set('innerHTML', html);
        } else if (html.indexOf('<body') > -1) {
            //Body without HTML
            Y.one('body').set('outerHTML', html);
        }
        args.forEach(function(v) {
            Y.log(eval(v));
        });
    });
};


