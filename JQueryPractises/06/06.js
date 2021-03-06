// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
/// <reference path="../typings/globals/jquery/index.d.ts" />
$(document).ready(function () {
    $('#letter-a a').click(function (event) {

        event.preventDefault();
        $('#dictionary').load('a.html');
        alert('Loaded!');

    });
});

$(document).ready(function () {
    $('#letter-b a').click(function (event) {
        event.preventDefault();
        $.getJSON('b.json', function (data) {
            var html = '';
            $.each(data, function (entryIndex, entry) {
                html += '<div class="entry">';
                html += '<h3 class="term">' + entry.term + '</h3>';
                html += '<div class="part">' + entry.part + '</div>';
                html += '<div class="definition">';
                html += entry.definition;

                if (entry.quote) {
                    html += '<div class="quote">';
                    $.each(entry.quote, function (lineIndex, line) {

                        html += '<div class="quote-line">' + line + '</div>';

                    });

                    if (entry.author) {

                        html += '<div class="quote-author">' + entry.author + '</div>';
                    }

                }
                html += '</div>';
                html += '</div>';
            });

            $('#dictionary').html(html);

        });
    });
});

$(document).ready(function () {
    $('#letter-c a').click(function (event) {
        event.preventDefault();
        $.getScript('c.js');
    });
});

$(document).ready(function () {
    $('#letter-d a').click(function (event) {
        event.preventDefault();
        $.get('d.xml', function (data) {
            $('#dictionary').empty();
            $(data).find('entry').each(function () {
                var $entry = $(this);
                var html = '<div class="entry">';
                html += '<h3 class="term">' + $entry.attr('term');
                html += '</h3>';
                html += '<div class="part">' + $entry.attr('part');
                html += '</div>';
                html += '<div class="definition">';
                html += $entry.find('definition').text();
                var $quote = $entry.find('quote');
                if ($quote.length) {
                    html += '<div class="quote">';
                    $quote.find('line').each(function () {
                        html += '<div class="quote-line">';
                        html += $(this).text() + '</div>';
                    });
                    if ($quote.attr('author')) {
                        html += '<div class="quote-author">';
                        html += $quote.attr('author') + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
                $('#dictionary').append($(html));
            });
        });
    });
});

//letter e
// $(document).ready(function(){
//     $('#letter-e a').click(function(event){
//         event.preventDefault();
//         var requestData = { term: $(this).text() };

//         $.get('e.php', requestData, function(data){
//             $('#dictionary').html(data);
//         });
//     });
// });

$(document).ready(function(){
    $('#letter-e a').click(function(event){
        event.preventDefault();
        var requestData = { term : $(this).text() };

        $('#dictionary').load('e.php', requestData);
    });
});

// Example of a form submission
$(document).ready(function(){
    $('#letter-f form').submit(function(event){
        event.preventDefault();
        var formValues = $(this).serialize();
        $.get('f.php', formValues, function(data){
            
            $('#dictionary').html(data);

        });
    });
});