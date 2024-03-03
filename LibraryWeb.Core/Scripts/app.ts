const baseUrl = 'api';

class Authentication {

    private readonly defaultRole: number = 2; 

    user = {
        Фамилия: "",
        Имя: "",
        Логин: "",
        Пароль: "",
        КодРоли: this.defaultRole
    };


    constructor(surname: string = "", name: string = "", username: string = "", password: string = "", role: number = 2) {

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
                setCookie("auth_key", data.auth_key);
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
                $('#span-register-error').text(error.responseText).css('color', 'red');;
            });
        }
        else {
            $('#span-register-error').text("Фамилия и имя должны быть заполнены.").css('color', 'red');;
        }
    }

   

}

class Favorite {
    private bookName: string;

    constructor(bookName: string = "") {
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

    BookByName(bookTitle: string) {
        $.get(`/${baseUrl}/books`, { 'name': bookTitle }, ((data) => { 
            sessionStorage.setItem('bookData', JSON.stringify(data));
            window.location.href = `/book/name?${data.book.название}`;
        }));
    }

    AllBook() {
        $.get(`/${baseUrl}/books/allBooks`, ((data) => {
            this.tileBook(data);
        }));
    }

    createAboutBook(book) {
        $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);
        $('#h2-title-about-book').text(`${book.название}`);
        $('#p-author-about-book').text(`${book.автор}`);
        $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);
        $('#p-available-about-book').text(`Цена - ${book.цена} руб.`);
    }

    tileBook(books) {
        var bookTiles = [];
        books.forEach(books => {
            bookTiles.push('<div class="col-md-2 mt-3">');
            bookTiles.push('<div class="tile">');
            bookTiles.push('<div class="tile-content">');
            bookTiles.push(`<div class="tile-book">${books.название}</div>`);
            bookTiles.push(`<button class="btn-about-book"><img src="data:image/png;base64,${books.обложка}" width="150" height="200" alt="Обложка книги ${books.название}"></button>`);
            bookTiles.push('</div>');
            bookTiles.push('</div>');
            bookTiles.push('</div>');
        });

        $('#tileContainer').append('<div class="row">' + bookTiles.join('') + '</div>');
    }

    clearUrlBook(bookUrl: string) {
        return bookUrl.substr((bookUrl.indexOf('?') + 1));
    }
}

class Cart {

    AddCartItem(orderName: string) {
        $.post(`/${baseUrl}/cart/addCartItem?bookName=${orderName}&userID=${sessionStorage.getItem('userid')}`);
    }

    ShowCartList() {
        $.get(`/${baseUrl}/cart/allCartItems`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.CartElement(data);
        }));
    }
    
    DeleteCartItem(orderDelete: string) {
        $.ajax({
            url: `/${baseUrl}/cart/deleteCartItem?orderDel=${orderDelete}`,
            method: 'delete',
            async: true
        }).done(() => {
            window.location.reload();
        });
    }
    ClearCart(elementHref: string) {
        var books = new Book();
        document.querySelectorAll(`${elementHref}`).forEach(links => {
            if (links.getAttribute('href').length > 0) {
                $.ajax({
                    url: `/${baseUrl}/cart/deleteCartItem?orderDel=${books.clearUrlBook(decodeURI(links.getAttribute('href')))}`,
                    method: 'delete',
                    async: true
                }).done(() => {
                    window.location.reload();
                });
            }
        });
    }

    selectFillPickupPoint() {
        var arr = [];
        var data = JSON.parse(sessionStorage.getItem('pickup_point_data'));
        data.forEach(data => {
            arr.push(`<option>${data.адрес} | ${data.название}</option>`);
        });
        $('#select-pickup-point').append(arr.join(""));
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

    private readonly defaultRole: number = 2; 

    userProfile = {
        Фамилия: "",
        Имя: "",
        Логин: "",
        Пароль: "",
        Фото: new Uint8Array(0),
        КодРоли: this.defaultRole
    }

    constructor(name: string = "", surname: string = "", username: string = "", password: string = "", photo: Uint8Array = null) {

        this.userProfile = {
            Фамилия: surname,
            Имя: name,
            Логин: username,
            Пароль: password,
            Фото: photo,
            КодРоли: this.defaultRole
        };
    }

    ShowProfileInfo() {
        $.get(`/${baseUrl}/profile/profileInformation`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            $('#p-user-email').text(`Email - ${data.login}`);
            $('#p-user-surname').text(`Фамилия - ${data.surname}`);
            $('#p-user-name').text(`Имя - ${data.name}`);
            $('#img-photo-profile').attr('src', `data:image/png;base64,${data.photo}`);
        }));
    }
    EditProfileInfo() {
        $.ajax({
            url: `/${baseUrl}/profile/editProfile?userID=${sessionStorage.getItem('userid')}`,
            method: 'put',
            data: JSON.stringify(this.userProfile),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
        }).done((data) => {
            sessionStorage.setItem('userlogin', this.userProfile.Логин);
            window.location.reload();
        }).fail((error) => {
            $('#span-edit-error').text(`${error.responseText}`).css('color', 'red');
        });
    }

    EditProfilePhoto() {
        $.ajax({
            url: `/${baseUrl}/profile/editPhoto?userID=${sessionStorage.getItem('userid')}`,
            method: 'post',
            data: JSON.stringify(`${sessionStorage.getItem('imgData')}`),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                window.location.reload();
                $('#input-photo-edit').empty();
            }
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
    AddNewOrder(elementHref:string, userID:number) {
        var books = new Book();
        document.querySelectorAll(`${elementHref}`).forEach(links => {
            $.post(`/${baseUrl}/order/addOrder?bookName=${books.clearUrlBook(decodeURI(links.getAttribute('href')))}&userID=${userID}`);
        });
    }
    ShowOrders() {
        $.get(`/${baseUrl}/order/getOrder`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.tableOrderFill(data);
        }));
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

class PickupPoint {
    ShowPickupPoints() {
        $.get(`/${baseUrl}/pickup/allPickupPoints`, function (data) {
            var arr = [];
            data.forEach(data => {
                arr.push(`<div class="col-md-2 mt-3 card-wrapper">`);
                arr.push(`<div class="card">`);
                arr.push(`<div class="card-body">`);
                arr.push(`<h5 class="card-title">${data.название}</h5>`);
                arr.push(`<p class="card-text">${data.адрес}</p>`);
                arr.push(`</div>`);
                arr.push(`</div>`);
                arr.push(`</div>`);

            });
            $('#div-show-pickup').append(arr.join(""));
        });
    }
}

function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    } else { return ""; }
}

function deleteCookie(name: string) {
    const date = new Date();

    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));


    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

function readFileAsByteArray(input: HTMLInputElement, callback: (byteArray: Uint8Array) => void) {
    const reader = new FileReader();

    const files = $(input).prop('files'); 

    if (files && files.length > 0) {
        const file = files[0];

        reader.onload = (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            const byteArray = new Uint8Array(arrayBuffer);
            callback(byteArray);
        };

        reader.readAsArrayBuffer(file);
    }
}

function byteArrayToBase64(byteArray: Uint8Array): Promise<string | null> {
    return new Promise((resolve) => {
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                resolve(null);
            }
        };
        reader.readAsDataURL(blob);
    });
}


$(function () {

    $('#btn-photo-change').on('click', function (event) {
        event.preventDefault();
        readFileAsByteArray(($('#input-photo-edit').get(0) as HTMLInputElement), (byteArray) => {
            byteArrayToBase64(byteArray).then(base64String => {
                var profile = new Profile();
                sessionStorage.setItem('imgData', base64String);
                profile.EditProfilePhoto();
            });
        });
    });
    $('#btn-order-clear').on('click', function (event) {
        event.preventDefault();
        var cart = new Cart();
        cart.ClearCart('#a-redirect-cart-about-book');
    });

    $('#btn-logout-profile').on('click', function (event) {
        deleteCookie("auth_key");
        sessionStorage.clear();
        window.location.href = "/"
    });

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
        else { $('#span-edit-error').text('Пароли должны быть одинаковыми.').css('color', 'red'); }
    });

    $('#btn-favorite-show').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            $('#div-favorite-list').empty();
            var favorite = new Favorite();
            favorite.ShowListFavorite();
        } else {
            window.location.href = "/";
            alert("Войдите в профиль для сохранение книги в избранное.");
        }
    });

    $('#btn-favorite-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            var favorClass = new Favorite($('#h2-title-about-book').text());
            favorClass.AddToFavorite();
        } else {
            window.location.href = "/";
            alert("Войдите в профиль для сохранение книги в избранное.");
        }
     
    });
    $('#btn-cart-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            var cart = new Cart();
            cart.AddCartItem($('#h2-title-about-book').text());
        } else {
            window.location.href = "/";
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
                $.get(`/${baseUrl}/pickup/allPickupPoints`, function (data) { sessionStorage.setItem('pickup_point_data', JSON.stringify(data)); });
                break;
            }
            case '/cart': {
                var cart = new Cart();
                cart.ShowCartList();
                cart.selectFillPickupPoint();
                break;
            }
            case '/profile': {
                var profile = new Profile();
                var order = new Order();
                profile.ShowProfileInfo();
                order.ShowOrders();
                break;
            }
            case '/pickup-point': {
                var point = new PickupPoint();
                point.ShowPickupPoints();
                break;
            }
        }
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
            ($('#div-login-modal') as any).modal('hide');
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