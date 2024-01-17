﻿const baseUrl = 'api';

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

    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();

        var bookTitle = $(this).closest('.tile').find('.tile-book').text();

        $.ajax({
            url: `${baseUrl}/books`,
            method: 'get',
            dataType: 'json',
            data: { 'name': bookTitle },
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            createAboutBook(data.author, data.genre, data.book);
        }).fail(function (handleError) {
            console.log(handleError);
        });
    });
    function createAboutBook(author, genre, book) {
        var arr = [];
        arr.push('<div>');
        arr.push(`<img src="data:image/png;base64,${book.обложкаКниги}">`);
        arr.push('</div>');
        arr.push('<div class="col-md-8 text-left">');
        arr.push(`<h1>${book.название}</h1>`);
        arr.push(`<p>Автор - ${author.фио}</p>`);
        arr.push(`<p>Жанр - ${genre.названиеЖанра}</p>`);
        arr.push('</div>');
        $('#divAboutBook').append('<div class="row">' + arr.join('') + '</div>');
        location.href = `book/name=${book.название}`;
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
