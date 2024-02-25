const baseUrl = 'api';

class Authentication {

    private readonly defaultRole: number = 2; 

    user = {
        Логин: "",
        Пароль: "",
        КодРоли: this.defaultRole
    };


    constructor(username: string = "", password: string = "", role: number = 2) {

        this.user = {
            Логин: username,
            Пароль: password,
            КодРоли: role
        };
    }

    Login() {
        if (this.user.Логин !== "" && this.user.Пароль !== "") {
            $.ajax({
                url: `/${baseUrl}/auth/login`,
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(this.user),
                async: true
            }).done((data) => {
                document.cookie = "auth_key=" + data.auth_key;
                sessionStorage.setItem('userlogin', this.user.Логин);
                sessionStorage.setItem('userid', data.userID);
                $('#span-login-error').text("");
            }).fail((error) => {
                $('#span-login-error').text(`${error.responseText}`).css('color', 'red');
            });
        }
    }

    Register() {
        $.ajax({
            url: `/${baseUrl}/auth/register`,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(this.user),
            async: true
        }).done(() => {
            $('#span-register-error').text("");
        });
    }
}

class Favorite {
    private bookName: string;

    constructor(bookName: string = "") {
        this.bookName = bookName;
    }

    AddToFavorite() {
        $.ajax({
            url: `/${baseUrl}/Favorite/addFavorite`,
            method: 'get',
            data: {
                'nameBook': this.bookName,
                'userID': sessionStorage.getItem('userid')
            },
            contentType: 'application/json;charset=utf-8',
            async: true
        });
    }

    ShowListFavorite() {
        $.ajax({
            url: `/${baseUrl}/Favorite/getFavorite`,
            method: 'get',
            dataType: 'json',
            data: { 'userID': sessionStorage.getItem('userid') },
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            console.log(data);
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var bookName = `${data[i].кодКнигиNavigation.название}`;
                arr.push('<li>');
                arr.push(`<a class="btn text-align-center" href="/book/name?${encodeURIComponent(bookName)}" id="a-redirect-about-book">${bookName}</a>`);
                arr.push('</li>');
            }
            $('#div-favorite-list').append(arr.join(""));
        });
    }
}

class Book {

    BookByName(bookTitle:string) {
        $.ajax({
            url: `/${baseUrl}/books`,
            method: 'get',
            dataType: 'json',
            data: { 'name': bookTitle },
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            sessionStorage.setItem('bookData', JSON.stringify(data));
            window.location.href = `/book/name?${data.book.название}`;
        }).fail(function (handleError) {
            console.log(handleError);
        });
    }

    AllBook() {
        $.ajax({
            url: `${baseUrl}/books/allBooks`,
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true
        }).done((data) => {
            this.tileBook(data);
        }).fail((handleError) => {
            console.log(handleError);
        });
    }

    createAboutBook(book) {
        $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);
        $('#h2-tittle-about-book').text(`${book.название}`);
        $('#p-author-about-book').text(`${book.автор}`);
        $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);
        $('#p-available-about-book').text(`Наличии - ${book.наличие} шт.`);
    }

    tileBook(books) {
        var arr = [];

        for (var i = 0; i < books.length; i++) {
            arr.push('<div class="col-md-2 mt-3">');
            arr.push('<div class="tile">');
            arr.push('<div class="tile-content">');
            arr.push(`<div class="tile-book">${books[i].название}</div>`);
            arr.push(`<button class="btn-about-book"><img src="data:image/png;base64,${books[i].обложка}" width="150" height="200" alt="Обложка книги ${books[i].название}"></button>`);
            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
        }

        $('#tileContainer').append('<div class="row">' + arr.join('') + '</div>');
    }
}
$(function () {

    $('#btn-favorite-show').on('click', function (event) {
        event.preventDefault();
        if (sessionStorage.getItem('userlogin') != null && sessionStorage.getItem('userid') != null) {
            $('#div-favorite-list').empty();
            var favorite = new Favorite();
            favorite.ShowListFavorite();
        } else { alert("Войдите в профиль для сохранение книги в избранное."); }

    });

    $('#btn-favorite-book').on('click', function (event) {
        event.preventDefault();
        if (document.cookie.includes("auth_key=")) {
            var favorClass = new Favorite($('#h2-tittle-about-book').text());
            favorClass.AddToFavorite();
        } else { alert("Войдите в профиль для сохранение книги в избранное."); }
     
    });

    $(document).ready(function () {

        var books = new Book();
        $('#p-user-login').text("Войти");
        if (window.location.pathname.length == 1) {
            books.AllBook();
        }
        else if (window.location.href.includes('/book/name') && sessionStorage.getItem('bookData') != null) {
            var dataStorage = JSON.parse(sessionStorage.getItem('bookData'));
            books.createAboutBook(dataStorage.book);
        }
        if (sessionStorage.getItem('userlogin') != null) {
            $('#p-user-login').text(`Добро пожаловать - ${sessionStorage.getItem('userlogin')}`);
        }
    });

    $('#btn-form-search').on('click', function (event) {
        event.preventDefault();

        var searchText = $('#input-text-search').val();

        $('.col-md-4').each(function () {
            var tileDescriptionText = $(this).find('.tile-book').text().toLowerCase();

            if (tileDescriptionText.search(searchText.toString().toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $(document).on('click', '#a-redirect-about-book', function (event) {
        event.preventDefault();
        var decodUrl = decodeURI(this.getAttribute('href'));
        var bookTitle = decodUrl.substr((decodUrl.indexOf('?') + 1));
        var book = new Book();
        book.BookByName(bookTitle);
    });

    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();
        var book = new Book();
        book.BookByName($(this).closest('.tile').find('.tile-book').text());
       
    });

    $('#btn-form-login').on('click', function (event) {
        event.preventDefault();
        var enter = new Authentication($('#input-form-email').val().toString(), $('#input-form-password').val().toString(), 1);
        enter.Login();
        if ($('#span-login-error').text().toString() == "") ($('#div-login-modal') as any).modal('hide');
    });

    $('#btn-form-register').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-register').val() == $('#input-form-password-repeat').val()) {
            var register = new Authentication($('#input-form-email-register').val().toString(), $('#input-form-password-register').val().toString());
            register.Register();
            if ($('#span-register-error').text().toString() == "") ($('#div-register-modal') as any).modal('hide');
        }
        else {
            $('#span-register-error').text("Пароли должны быть одинаковые").css('color', 'red');
        }
    }); 
});