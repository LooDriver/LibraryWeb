const baseUrl = 'api';
class Authentication {
    constructor(surname = "", name = "", username = "", password = "", role = 2) {
        this.defaultRole = 2;
        this.user = {
            Фамилия: "",
            Имя: "",
            Логин: "",
            Пароль: "",
            КодРоли: this.defaultRole
        };
        this.user = {
            Фамилия: surname,
            Имя: name,
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
                data: JSON.stringify(this.user)
            }).done((data) => {
                document.cookie = "auth_key=" + data.auth_key;
                sessionStorage.setItem('userlogin', this.user.Логин);
                sessionStorage.setItem('userid', data.userID);
                $('#span-login-error').text("");
                window.location.reload();
            }).fail((error) => {
                $('#span-login-error').text(`${error.responseText}`).css('color', 'red');
            });
        }
        else {
            $('#span-login-error').text('Логин или пароль не могут быть пустыми.').css('color', 'red');
        }
    }
    Register() {
        if (this.user.Фамилия != "" && this.user.Имя != "") {
            $.ajax({
                url: `/${baseUrl}/auth/register`,
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(this.user)
            }).done(() => {
                $('#span-register-error').text("");
                window.location.reload();
            }).fail((error) => {
                $('#span-register-error').text(error.responseText).css('color', 'red');
                ;
            });
        }
        else {
            $('#span-register-error').text("Фамилия и имя должны быть заполнены.").css('color', 'red');
            ;
        }
    }
}
class Favorite {
    constructor(bookName = "") {
        this.bookName = bookName;
    }
    AddToFavorite() {
        $.ajax({
            url: `/${baseUrl}/Favorite/addFavorite?nameBook=${this.bookName}&userID=${sessionStorage.getItem('userid')}`,
            method: 'post',
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
            var arr = [];
            data.forEach(data => {
                arr.push('<li>');
                arr.push(`<a class="btn text-align-center" href="/book/name?${encodeURIComponent(data.кодКнигиNavigation.название)}" id="a-redirect-about-book">${data.кодКнигиNavigation.название}</a>`);
                arr.push('</li>');
            });
            $('#div-favorite-list').append(arr.join(""));
        });
    }
}
class Book {
    BookByName(bookTitle) {
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
        });
    }
    createAboutBook(book) {
        $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);
        $('#h2-tittle-about-book').text(`${book.название}`);
        $('#p-author-about-book').text(`${book.автор}`);
        $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);
        $('#p-available-about-book').text(`Цена - ${book.цена} руб.`);
    }
    tileBook(books) {
        var arr = [];
        books.forEach(books => {
            arr.push('<div class="col-md-2 mt-3">');
            arr.push('<div class="tile">');
            arr.push('<div class="tile-content">');
            arr.push(`<div class="tile-book">${books.название}</div>`);
            arr.push(`<button class="btn-about-book"><img src="data:image/png;base64,${books.обложка}" width="150" height="200" alt="Обложка книги ${books.название}"></button>`);
            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
        });
        $('#tileContainer').append('<div class="row">' + arr.join('') + '</div>');
    }
    clearUrlBook(bookUrl) {
        return bookUrl.substr((bookUrl.indexOf('?') + 1));
    }
}
class Cart {
    AddCartItem(orderName) {
        $.ajax({
            url: `/${baseUrl}/cart/addCartItem?bookName=${orderName}&userID=${sessionStorage.getItem('userid')}`,
            method: 'post',
            async: true
        });
    }
    ShowCartList() {
        $.ajax({
            url: `/${baseUrl}/cart/allCartItems`,
            method: 'get',
            data: { 'userID': sessionStorage.getItem('userid') },
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done((data) => {
            this.CartElement(data);
        });
    }
    DeleteCartItem(orderDelete) {
        $.ajax({
            url: `/${baseUrl}/cart/deleteCartItem?orderDel=${orderDelete}`,
            method: 'delete',
            async: true
        }).done(() => {
            window.location.reload();
        });
    }
    CartElement(cart) {
        var arr = [];
        var sumCostBook = 0;
        var countCartBooks = 1;
        cart.forEach(cart => {
            sumCostBook += cart.кодКнигиNavigation.цена;
            arr.push('<tr>');
            arr.push(`<th scope="row">${countCartBooks++}</th>`);
            arr.push(`<td class="td-book-name"><a class="btn" id="a-redirect-cart-about-book" href="/book/name?${cart.кодКнигиNavigation.название}"</a>${cart.кодКнигиNavigation.название}</td>`);
            arr.push(`<td>${cart.кодКнигиNavigation.цена} руб.</td>`);
            arr.push(`<td>${cart.кодКнигиNavigation.наличие}</td>`);
            arr.push(`<td><button type="button" class="btn btn-sm btn-danger" id="btn-delete-cart-item">Удалить</button></td>`);
            arr.push('</tr>');
        });
        $('#h4-final-sum').text(`Общая сумма - ${sumCostBook} руб.`);
        $('#tbody-cart-items').append(arr.join(""));
    }
}
class Profile {
    constructor(name = "", surname = "", username = "", password = "") {
        this.defaultRole = 2;
        this.userProfile = {
            Фамилия: "",
            Имя: "",
            Логин: "",
            Пароль: "",
            КодРоли: this.defaultRole
        };
        this.userProfile = {
            Фамилия: surname,
            Имя: name,
            Логин: username,
            Пароль: password,
            КодРоли: this.defaultRole
        };
    }
    ShowProfileInfo() {
        $.ajax({
            url: `/${baseUrl}/profile/profileInformation`,
            method: 'get',
            data: { 'userID': sessionStorage.getItem('userid') },
            async: true
        }).done((data) => {
            $('#p-user-email').text(`Email - ${data.login}`);
            $('#p-user-surname').text(`Фамилия - ${data.surname}`);
            $('#p-user-name').text(`Имя - ${data.name}`);
        });
    }
    EditProfileInfo() {
        $.ajax({
            url: `/${baseUrl}/profile/editProfile?userID=${sessionStorage.getItem('userid')}`,
            method: 'put',
            data: JSON.stringify(this.userProfile),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                sessionStorage.setItem('userlogin', this.userProfile.Логин);
                window.location.reload();
            }
        }).fail((error) => {
            $('#span-edit-error').text(`${error.responseText}`).css('color', 'red');
        });
    }
    FillEditProfileInfo() {
        $.get(`/${baseUrl}/profile/getCurrentProfile?userID=${sessionStorage.getItem('userid')}`, function (data) {
            $('#input-form-edit-name').val(data.name);
            $('#input-form-edit-surname').val(data.surname);
            $('#input-form-edit-email').val(data.login);
        });
    }
}
class Order {
    AddNewOrder(elementHref, userID) {
        var books = new Book();
        document.querySelectorAll(`${elementHref}`).forEach(links => {
            $.post(`/${baseUrl}/order/addOrder?bookName=${books.clearUrlBook(decodeURI(links.getAttribute('href')))}&userID=${userID}`);
        });
    }
    ShowOrders() {
        $.ajax({
            url: `/${baseUrl}/order/getOrder`,
            method: 'get',
            data: { 'userID': sessionStorage.getItem('userid') },
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done((data) => {
            this.tableOrderFill(data);
        });
    }
    tableOrderFill(orders) {
        var arr = [];
        var countOrders = 1;
        orders.forEach(orders => {
            var bookName = orders.кодКнигиNavigation.название;
            arr.push('<tr>');
            arr.push(`<th scope="row">${countOrders++}</th>`);
            arr.push(`<td><a id="a-redirect-profile-book" class="btn" href="/book/name?${bookName}"</a>${bookName}</td>`);
            arr.push(`<td>${orders.датаЗаказа}</td>`);
            arr.push(`<td>${orders.статус}</td>`);
            arr.push('</tr>');
        });
        $('#tbody-profile-table').append(arr.join(""));
    }
}
$(function () {
    $('#btn-modal-profile-edit').on('click', function (event) {
        event.preventDefault();
        var profile = new Profile();
        profile.FillEditProfileInfo();
    });
    $('#btn-form-profile-edit').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-edit').val() == $('#input-form-password-edit-repeat').val()) {
            var profile = new Profile($('#input-form-edit-name').val().toString(), $('#input-form-edit-surname').val().toString(), $('#input-form-edit-email').val().toString(), $('#input-form-password-edit').val().toString());
            profile.EditProfileInfo();
        }
        else {
            $('#span-edit-error').text('Пароли должны быть одинаковыми.').css('color', 'red');
        }
    });
    $('#btn-favorite-show').on('click', function (event) {
        event.preventDefault();
        if (sessionStorage.getItem('userlogin') != null && sessionStorage.getItem('userid') != null) {
            $('#div-favorite-list').empty();
            var favorite = new Favorite();
            favorite.ShowListFavorite();
        }
        else {
            alert("Войдите в профиль для сохранение книги в избранное.");
        }
    });
    $('#btn-favorite-book').on('click', function (event) {
        event.preventDefault();
        if (document.cookie.includes("auth_key=")) {
            var favorClass = new Favorite($('#h2-tittle-about-book').text());
            favorClass.AddToFavorite();
        }
        else {
            alert("Войдите в профиль для сохранение книги в избранное.");
        }
    });
    $('#btn-cart-book').on('click', function (event) {
        event.preventDefault();
        if (document.cookie.includes("auth_key=")) {
            var cart = new Cart();
            cart.AddCartItem($('#h2-tittle-about-book').text());
        }
        else {
            alert("Войдите в профиль для сохранение книги в корзину.");
        }
    });
    $(document).ready(function () {
        $('#p-user-login').text("Войти");
        if (window.location.href.includes('/book/name')) {
            var bookByName = new Book();
            var dataStorage = JSON.parse(sessionStorage.getItem('bookData'));
            bookByName.createAboutBook(dataStorage.book);
        }
        if (sessionStorage.getItem('userlogin') != null) {
            $('#p-user-login').text(`Добро пожаловать - ${sessionStorage.getItem('userlogin')}`);
            $('#btn-login').removeAttr('data-bs-toggle');
            $('#btn-login').removeAttr('data-bs-target');
            $('#btn-login').attr('href', '/profile');
        }
        switch (window.location.href.substring((window.location.href.indexOf('8') + 1))) {
            case '/': {
                var books = new Book();
                books.AllBook();
                break;
            }
            case '/cart': {
                var cart = new Cart();
                cart.ShowCartList();
                break;
            }
            case '/profile': {
                var profile = new Profile();
                var order = new Order();
                profile.ShowProfileInfo();
                order.ShowOrders();
                break;
            }
        }
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
    $(document).on('click', '#a-redirect-about-book', function (event) {
        event.preventDefault();
        var book = new Book();
        book.BookByName(book.clearUrlBook(decodeURI(this.getAttribute('href'))));
    });
    $(document).on('click', '#a-redirect-profile-book', function (event) {
        event.preventDefault();
        var book = new Book();
        book.BookByName(book.clearUrlBook(decodeURI(this.getAttribute('href'))));
    });
    $(document).on('click', '#a-redirect-cart-about-book', function (event) {
        event.preventDefault();
        var book = new Book();
        book.BookByName(book.clearUrlBook(decodeURI(this.getAttribute('href'))));
    });
    $('#tbody-cart-items').on('click', '#btn-delete-cart-item', function (event) {
        event.preventDefault();
        var cart = new Cart();
        cart.DeleteCartItem($(this).closest('tr').find('.td-book-name').text());
    });
    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();
        var book = new Book();
        book.BookByName($(this).closest('.tile').find('.tile-book').text());
    });
    $('#btn-order-success').on('click', function (event) {
        event.preventDefault();
        var order = new Order();
        order.AddNewOrder('#a-redirect-cart-about-book', Number.parseInt(sessionStorage.getItem('userid')));
    });
    $('#btn-form-login').on('click', function (event) {
        event.preventDefault();
        var enter = new Authentication('', '', $('#input-form-email').val().toString(), $('#input-form-password').val().toString(), 1);
        enter.Login();
        if ($('#span-login-error').text().toString() == "") {
            $('#div-login-modal').modal('hide');
        }
    });
    $('#btn-form-register').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-register').val() == $('#input-form-password-repeat').val()) {
            var register = new Authentication($('#input-form-surname').val().toString(), $('#input-form-name').val().toString(), $('#input-form-email-register').val().toString(), $('#input-form-password-register').val().toString());
            register.Register();
        }
        else {
            $('#span-register-error').text("Пароли должны быть одинаковые").css('color', 'red');
        }
    });
});
//# sourceMappingURL=app.js.map