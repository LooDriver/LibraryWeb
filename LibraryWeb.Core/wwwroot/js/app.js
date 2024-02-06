var baseUrl = 'api';
$(function () {
    $(document).ready(function () {
        if (window.location.pathname.length == 1) {
            $.ajax({
                url: "".concat(baseUrl, "/books/allBooks"),
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
        else if (window.location.href.search('book/name') && sessionStorage.getItem('bookData') !== undefined) {
            var dataStorage = JSON.parse(sessionStorage.getItem('bookData'));
            createAboutBook(dataStorage.author, dataStorage.genre, dataStorage.book);
        }
        else if (window.location.href.search('easydata') && sessionStorage.getItem('auth_key') !== undefined) {
            var token = sessionStorage.getItem('auth_key');
            fetch('/easydata', {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW5AbWFpbC5ydSIsImV4cCI6MTcwNjI3NTEyMCwiaXNzIjoiU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.qrftgT9qbrtcmogEtSffQ6xwyZlf83ryPcZtGh0DBPM",
                    "Accept": "application/json"
                }
            }).then(function (response) {
                if (response.ok) {
                    window.location.href = '/easydata';
                }
            }).then(function (data) {
            }).catch(function (err) {
                console.log(err);
            });
        }
    });
    $('#btn-test-auth').on('click', function (event) {
        event.preventDefault();
        var login = {
            Логин: 'admin@mail.ru',
            Пароль: '123'
        };
        $.ajax({
            url: "".concat(baseUrl, "/auth/login"),
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(login),
            async: true
        }).done(function (data) {
            sessionStorage.setItem('auth_key', "".concat(data));
        }).fail(function () {
            event.preventDefault();
        });
    });
    $('#btn-form-search').on('click', function (event) {
        event.preventDefault();
        var searchText = $('#input-text-search').val();
        $('.col-md-4').each(function () {
            var tileDescriptionText = $(this).find('.tile-book').text().toLowerCase();
            if (tileDescriptionText.search(searchText.toString().toLowerCase())) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    });
    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();
        var bookTitle = $(this).closest('.tile').find('.tile-book').text();
        $.ajax({
            url: "".concat(baseUrl, "/books"),
            method: 'get',
            dataType: 'json',
            data: { 'name': bookTitle },
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            sessionStorage.setItem('bookData', JSON.stringify(data));
            window.location.href = "book/name?".concat(data.book.название);
        }).fail(function (handleError) {
            console.log(handleError);
        });
    });
    $('#btn-form-login').on('click', function (event) {
        var login = {
            Логин: $('#input-form-email').val(),
            Пароль: $('#input-form-password').val()
        };
        $.ajax({
            url: "".concat(baseUrl, "/auth/enter"),
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(login),
            async: true
        }).done(function (data) {
            sessionStorage.setItem('auth_key', "".concat(data));
        }).fail(function () {
            event.preventDefault();
        });
    });
    $('#btn-form-register').on('click', function (event) {
        var registerUser = {
            Логин: $('#input-form-email-register').val(),
            Пароль: $('#input-form-password-register').val(),
            КодРоли: 2
        };
        if (registerUser.Пароль == $('#input-form-password-repeat').val()) {
            $.ajax({
                url: "".concat(baseUrl, "/auth/register"),
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
        arr.push("<img src=\"data:image/png;base64,".concat(book.обложкаКниги, "\" alt=\"\u0444\u043E\u0442\u043E\">"));
        arr.push('</div>');
        arr.push('<div class="col-md-8">');
        arr.push('<div class="book-details">');
        arr.push("<h2>".concat(book.название, "</h2>"));
        arr.push("<p class=\"text-muted\">\u0410\u0432\u0442\u043E\u0440: ".concat(author.фио, "</p>"));
        arr.push("<p><strong>\u0416\u0430\u043D\u0440: </strong>".concat(genre.названиеЖанра, "</p>"));
        arr.push("<p><strong>\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438: </strong>".concat(book.количествоВНаличии, "</p>"));
        arr.push("</div>");
        arr.push("<div class=\"book-description\">");
        arr.push("<hr>");
        arr.push("<h4>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</h4>");
        arr.push("<p></p>");
        arr.push("<hr>");
        arr.push("</div>");
        arr.push("<p class=\"text-left\">");
        arr.push("<a class=\"btn btn-primary\" id=\"btn-about-buy\">\u041A\u0443\u043F\u0438\u0442\u044C</a>");
        arr.push("<a class=\"btn btn-primary\" id=\"btn-about-read-passage\">\u0427\u0438\u0442\u0430\u0442\u044C \u043E\u0442\u0440\u044B\u0432\u043E\u043A</a>");
        arr.push("</p>");
        arr.push("</div>");
        $('#div-about-book').append('<div class="row">' + arr.join('') + '</div>');
    }
    function tilesFiller(books) {
        var arr = [];
        for (var i = 0; i < books.length; i++) {
            arr.push('<div class="col-md-2">');
            arr.push('<div class="tile">');
            arr.push('<div class="tile-content">');
            arr.push("<div class=\"tile-book\">".concat(books[i].название, "</div>"));
            arr.push("<button class=\"btn-about-book\"><img src=\"data:image/png;base64,".concat(books[i].обложкаКниги, "\" width=\"100\" height=\"150\" alt=\"\u041E\u0431\u043B\u043E\u0436\u043A\u0430 \u043A\u043D\u0438\u0433\u0438 ").concat(books[i].название, "\"></button>"));
            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
        }
        $('#tileContainer').append('<div class="row">' + arr.join('') + '</div>');
    }
});
//# sourceMappingURL=app.js.map