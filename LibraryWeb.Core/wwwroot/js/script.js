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
        else if (window.location.href.includes('book/name') & sessionStorage.getItem('bookData') !== undefined) {
            var dataStorage = JSON.parse(sessionStorage.getItem('bookData'));
            createAboutBook(dataStorage.author, dataStorage.genre, dataStorage.book);
        }
        else if (window.location.href.includes('easydata') & sessionStorage.getItem('auth_key') !== undefined) {
        const token = sessionStorage.getItem('auth_key');
        fetch('/easydata',
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW5AbWFpbC5ydSIsImV4cCI6MTcwNjI3NTEyMCwiaXNzIjoiU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.qrftgT9qbrtcmogEtSffQ6xwyZlf83ryPcZtGh0DBPM`,
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    window.location.href = '/easydata';
                }
            }).then(data => {
            }).catch(function (err) {
                console.log(err);
            });
        }

    });

    $('#btn-test-auth').on('click', function (event) {
        event.preventDefault();
        let login = {
            Логин: 'admin@mail.ru',
            Пароль: '123'
        };
        $.ajax({
            url: `${baseUrl}/auth/login`,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(login),
            async: true
        }).done(function (data) {
            sessionStorage.setItem('auth_key', `${data}`);
            
        }).fail(function () {
            event.preventDefault();
        })
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
            sessionStorage.setItem('bookData', JSON.stringify(data));
            window.location.href = `book/name?${data.book.название}`;
        }).fail(function (handleError) {
            console.log(handleError);
        });
    });
    $('#btn-form-login').on('click', function (event) {
        let login = {
            Логин: $('#input-form-email').val(),
            Пароль: $('#input-form-password').val()
        };
        $.ajax({
            url: `${baseUrl}/auth/enter`,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(login),
            async: true
        }).done(function (data) {
            sessionStorage.setItem('auth_key', `${data}`);
        }).fail(function () {
            event.preventDefault();
        })
    });

    $('#btn-form-register').on('click', function (event) {

        let registerUser = {
            Логин: $('#input-form-email-register').val(),
            Пароль: $('#input-form-password-register').val(),
            КодРоли: 2
        }
        if (registerUser.Пароль == $('#input-form-password-repeat').val()) {
            $.ajax({
                url: `${baseUrl}/auth/register`,
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(registerUser),
                async: true

            }).done(function () {

            }).fail(function () {
                event.preventDefault();
            });
        }
        else {
            event.preventDefault();
            alert("Пароли должны быть одинаковыми");
        }

    });
    function createAboutBook(author, genre, book) {
        var arr = [];
        arr.push('<div class="col-md-4 text-center">');
        arr.push(`<img src="data:image/png;base64,${book.обложкаКниги}" alt="фото">`);
        arr.push('</div>');
        arr.push('<div class="col-md-8">');
        arr.push('<div class="book-details">');
        arr.push(`<h2>${book.название}</h2>`)
        arr.push(`<p class="text-muted">Автор: ${author.фио}</p>`);
        arr.push(`<p><strong>Жанр: </strong>${genre.названиеЖанра}</p>`);
        arr.push(`<p><strong>В наличии: </strong>${book.количествоВНаличии}</p>`);
        arr.push(`</div>`);
        arr.push(`<div class="book-description">`);
        arr.push(`<hr>`);
        arr.push(`<h4>Описание</h4>`);
        arr.push(`<p></p>`);
        arr.push(`<hr>`);
        arr.push(`</div>`);
        arr.push(`<p class="text-left">`);
        arr.push(`<a class="btn btn-primary" id="btn-about-buy">Купить</a>`);
        arr.push(`<a class="btn btn-primary" id="btn-about-read-passage">Читать отрывок</a>`);
        arr.push(`</p>`);
        arr.push(`</div>`);
        $('#div-about-book').append('<div class="row">' + arr.join('') + '</div>');

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
