const baseUrl = 'api';

$(function () {

    $(document).ready(function () {
        if (window.location.pathname.length == 1) {
            $.ajax({
                url: `${baseUrl}/books/allBooks`,
                method: 'get',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true
            }).done(function (data) {
                tilesFiller(data);

            }).fail(function (handleError) {
                console.log(handleError);
            });
        }
        else if (window.location.href.includes('book/name')) {
            var bookName = getParameterByName('1984');
            if (bookName) {
                test(bookName);
            }
        }
    });

    $('#btn-form-search').on('click', function (event) {
        event.preventDefault();

        var searchText = $('#input-text-search').val();

        $('.col-md-4').each(function () {
            var tileDescriptionText = $(this).find('.tile-book').text().toLowerCase();

            if (tileDescriptionText.includes(searchText.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    function test(bookTitle) {
        $.ajax({
            url: `${baseUrl}/books`,
            method: 'get',
            dataType: 'json',
            data: { 'name': bookTitle },
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            console.log(data);
            createAboutBook(data.author, data.genre, data.book);
        }).fail(function (handleError) {
            console.log(handleError);
        });
    }

    function getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }



    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();

        var bookTitle = $(this).closest('.tile').find('.tile-book').text();
        test(bookTitle);
    });

    function createAboutBook(author, genre, book) {
        var arr = [];
        arr.push('<div class="col-md-8 text-left">');
        arr.push(`<h1>${book.название}</h1>`);
        arr.push(`<p>Автор - ${author.фио}</p>`);
        arr.push(`<p>Жанр - ${genre.названиеЖанра}</p>`);
        arr.push('</div>');

        var aboutBookHtml = '<div class="row">' + arr.join('') + '</div>';
        console.log('Добавляются элементы в #divAboutBook:', aboutBookHtml);
        $('#divAboutBook').replaceWith(aboutBookHtml);
    }

    function tilesFiller(books) {
        var arr = [];

        for (var i = 0; i < books.length; i++) {
            arr.push('<div class="col-md-2">');
            arr.push('<div class="tile">');
            arr.push('<div class="tile-content">');
            arr.push(`<div class="tile-book">${books[i].название}</div>`);
            arr.push(`<button class="btn-about-book"><img src="data:image/png;base64,${books[i].обложкаКниги}" width="100" height="150" alt="Обложка книги ${books[i].название}"></button>`);
            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
        }

        $('#tileContainer').append('<div class="row">' + arr.join('') + '</div>');

    }
});
