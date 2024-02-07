var baseUrl = 'api';
var elementCreate = /** @class */ (function () {
    function elementCreate() {
    }
    elementCreate.prototype.createAboutBook = function (author, genre, book) {
        $('#img-cover-about-book').attr('src', "data:image/png;base64,".concat(book.обложкаКниги));
        $('#h2-tittle-about-book').text("".concat(book.название));
        $('#p-author-about-book').text("".concat(author.фио));
        $('#p-genre-about-book').text("\u0416\u0430\u043D\u0440 - ".concat(genre.названиеЖанра));
        $('#p-available-about-book').text("\u041D\u0430\u043B\u0438\u0447\u0438\u0438 - ".concat(book.количествоВНаличии, " \u0448\u0442."));
    };
    elementCreate.prototype.tilesFiller = function (books) {
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
    };
    return elementCreate;
}());
var Authentication = /** @class */ (function () {
    function Authentication(username, password) {
        this.defaultRole = 2;
        this.user = {
            Логин: "",
            Пароль: "",
            КодРоли: this.defaultRole
        };
        this.user.Логин = username;
        this.user.Пароль = password;
    }
    Authentication.prototype.Login = function () {
        if (this.user.Логин != "" && this.user.Пароль != "") {
            var result = false;
            $.ajax({
                url: "".concat(baseUrl, "/auth/login"),
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(this.user),
                async: true
            }).done(function (data) {
                /*sessionStorage.setItem('auth_key', `${data}`);*/
                result = true;
            }).fail(function () {
                result = false;
            });
            return result;
        }
    };
    Authentication.prototype.Register = function () {
        if (this.user.Пароль == $('#input-form-password-repeat').val()) {
            $.ajax({
                url: "".concat(baseUrl, "/auth/register"),
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(this.user),
                async: true
            }).done(function () {
            }).fail(function () {
            });
        }
        else {
            return 'Пароли должны быть одинаковыми';
        }
    };
    return Authentication;
}());
$(function () {
    $(document).ready(function () {
        var elements = new elementCreate();
        if (window.location.pathname.length == 1) {
            $.ajax({
                url: "".concat(baseUrl, "/books/allBooks"),
                method: 'get',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true
            }).done(function (data) {
                elements.tilesFiller(data);
            }).fail(function (handleError) {
                console.log(handleError);
            });
        }
        else if (window.location.href.search('book/name') && sessionStorage.getItem('bookData') !== undefined) {
            var dataStorage = JSON.parse(sessionStorage.getItem('bookData'));
            elements.createAboutBook(dataStorage.author, dataStorage.genre, dataStorage.book);
        }
        //else if (window.location.href.search('easydata') && sessionStorage.getItem('auth_key') !== undefined) {
        //const token = sessionStorage.getItem('auth_key');
        //fetch('/easydata',
        //    {
        //        method: 'GET',
        //        headers: {
        //            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW5AbWFpbC5ydSIsImV4cCI6MTcwNjI3NTEyMCwiaXNzIjoiU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.qrftgT9qbrtcmogEtSffQ6xwyZlf83ryPcZtGh0DBPM`,
        //            "Accept": "application/json"
        //        }
        //    }).then(response => {
        //        if (response.ok) {
        //            window.location.href = '/easydata';
        //        }
        //    }).then(data => {
        //    }).catch(function (err) {
        //        console.log(err);
        //    });
        //}
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
        event.preventDefault();
        var enter = new Authentication($('#input-form-email').val().toString(), $('#input-form-password').val().toString());
        if (enter.Login()) {
            alert("Успешно");
        }
        else {
            alert("Неуспешно");
        }
    });
    $('#btn-form-register').on('click', function (event) {
        event.preventDefault();
        var register = new Authentication($('#input-form-email-register').val().toString(), $('#input-form-password-register').val().toString());
        var res = register.Register();
        alert(res);
    });
});
//# sourceMappingURL=app.js.map