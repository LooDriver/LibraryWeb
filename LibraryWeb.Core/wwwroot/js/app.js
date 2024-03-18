const baseUrl = 'api';
class Authentication {
    constructor(surname = "", name = "", username = "", password = "") {
        this.user = {
            Фамилия: "",
            Имя: "",
            Логин: "",
            Пароль: "",
            КодРоли: 2
        };
        this.user = {
            Фамилия: surname,
            Имя: name,
            Логин: username,
            Пароль: password,
            КодРоли: 2
        };
    }
    Login() {
        if (this.user.Логин !== "" && this.user.Пароль !== "") {
            $.post(`/${baseUrl}/auth/login`, this.user, ((data) => {
                setCookie("auth_key", data.auth_key);
                setCookie("permission", data.role);
                sessionStorage.setItem('userlogin', this.user.Логин);
                sessionStorage.setItem('userid', data.userID);
                $('#span-login-error').text("");
                window.location.reload();
                if (data.role == 1) {
                    $('#a-admin-panel').css('display', 'inline');
                }
            })).fail((error) => {
                $('#span-login-error').text(`${error.responseText}`).css('color', 'red');
            });
        }
        else {
            $('#span-login-error').text('Логин или пароль не могут быть пустыми.').css('color', 'red');
        }
    }
    Register() {
        if (this.user.Фамилия != "" && this.user.Имя != "") {
            $.post(`/${baseUrl}/auth/register`, this.user, (() => {
                $('#span-register-error').text("");
                window.location.reload();
            })).fail((error) => {
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
    AddToFavorite(bookName) {
        checkIfFavoriteExists(bookName).then((result) => {
            if (result) {
                $('#btn-favorite-about-book').text('Удалить из избранного');
            }
            else {
                $.post(`/${baseUrl}/favorite/addFavorite`, { 'nameBook': bookName, 'userID': sessionStorage.getItem('userid') }, () => {
                    window.location.reload();
                });
            }
        });
    }
    ShowListFavorite() {
        $.get(`/${baseUrl}/favorite/getFavorite`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            var arr = [];
            data.forEach(data => {
                arr.push('<li>');
                arr.push(`<a class="btn text-align-center" href="/book/name?${encodeURIComponent(data.кодКнигиNavigation.название)}" id="a-redirect-about-book">${data.кодКнигиNavigation.название}</a>`);
                arr.push('</li>');
            });
            $('#div-favorite-list').append(arr.join(""));
        }));
    }
    RemoveFromFavorite(bookName) {
        $.post(`/${baseUrl}/favorite/deleteFavorite`, { 'bookName': bookName }, () => {
            window.location.reload();
        });
    }
}
class Book {
    BookByName(bookTitle) {
        $.get(`/${baseUrl}/books`, { 'name': bookTitle }, ((data) => {
            sessionStorage.setItem('bookData', JSON.stringify(data));
            window.location.href = `/book/name?${data.название}`;
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
        $('#p-quantity-about-book').text(`${book.наличие}`);
        $('#input-quantity-about-book').attr('max', `${book.наличие}`);
        if (sessionStorage.getItem('userid') == undefined) { }
        else {
            checkIfFavoriteExists(book.название).then((result) => {
                if (result) {
                    $('#btn-favorite-about-book').text('Удалить из избранного');
                }
                else {
                    $('#btn-favorite-about-book').text('Добавить в избранное');
                }
            });
        }
    }
    tileBook(books) {
        var bookTiles = [];
        books.forEach(books => {
            bookTiles.push('<div class="col-md-2 mt-3">');
            bookTiles.push('<div class="tile">');
            bookTiles.push('<div class="tile-content">');
            if (books.наличие == 0) {
                bookTiles.push(`<div class="tile-book">${books.название}</div>`);
                bookTiles.push(`<button class="btn-about-book" disabled="true"><img src="data:image/png;base64,${books.обложка}" width="150" height="200" alt="Нету в наличии книги ${books.название}"></button>`);
            }
            else {
                bookTiles.push(`<div class="tile-book">${books.название}</div>`);
                bookTiles.push(`<button class="btn-about-book"><img src="data:image/png;base64,${books.обложка}" width="150" height="200" alt="Обложка книги ${books.название}"></button>`);
            }
            bookTiles.push('</div>');
            bookTiles.push('</div>');
            bookTiles.push('</div>');
        });
        $('#tileContainer').append('<div class="row">' + bookTiles.join('') + '</div>');
    }
    clearUrlBook(bookUrl) {
        return bookUrl.substr((bookUrl.indexOf('?') + 1));
    }
}
class Cart {
    AddCartItem(orderName, quantity = 0) {
        if (quantity > Number.parseInt($('#p-quantity-about-book').text().toString())) {
            $('#span-information-quantity').text(`Количество не может быть больше максимального значения ${$('#input-quantity-about-book').attr('max')}`).css('color', 'red');
        }
        else {
            $('#span-information-quantity').empty();
            $.post(`/${baseUrl}/cart/addCartItem`, { 'bookName': orderName, 'userID': sessionStorage.getItem('userid'), 'quantity': quantity });
        }
    }
    ShowCartList() {
        $.get(`/${baseUrl}/cart/allCartItems`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.CartElement(data);
        }));
    }
    DeleteCartItem(orderDelete) {
        $.post(`/${baseUrl}/cart/deleteCartItem`, { 'orderDel': orderDelete }, () => {
            window.location.reload();
        });
    }
    ClearCart() {
        $.post(`/${baseUrl}/cart/clearCart`, { 'userID': sessionStorage.getItem('userid') }, () => {
            window.location.reload();
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
            sumCostBook += cart.кодКнигиNavigation.цена * cart.количество;
            arr.push('<tr>');
            arr.push(`<th scope="row">${countCartBooks++}</th>`);
            arr.push(`<td class="td-book-name"><a class="btn" id="a-redirect-cart-about-book" href="/book/name?${cart.кодКнигиNavigation.название}"</a>${cart.кодКнигиNavigation.название}</td>`);
            arr.push(`<td>${cart.кодКнигиNavigation.цена} руб.</td>`);
            arr.push(`<td>${cart.количество}</td>`);
            arr.push(`<td><button type="button" class="btn btn-sm btn-danger" id="btn-delete-cart-item">Удалить</button></td>`);
            arr.push('</tr>');
        });
        $('#h4-final-sum').text(`Общая сумма - ${sumCostBook} руб.`);
        $('#tbody-cart-items').append(arr.join(""));
    }
}
class Profile {
    constructor(name = "", surname = "", username = "", password = "", photo = null) {
        this.userProfile = {
            Фамилия: "",
            Имя: "",
            Логин: "",
            Пароль: "",
            Фото: new Uint8Array(0),
        };
        this.userProfile = {
            Фамилия: surname,
            Имя: name,
            Логин: username,
            Пароль: password,
            Фото: photo,
        };
    }
    ShowProfileInfo() {
        $.get(`/${baseUrl}/profile/profileInformation`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            $('#input-form-edit-login').val(`${data.login}`);
            $('#input-form-edit-surname').val(`${data.surname}`);
            $('#input-form-edit-name').val(`${data.name}`);
            $('#img-photo-profile').attr('src', `data:image/png;base64,${data.photo}`);
            $('#img-photo-edit-modal').attr('src', `data:image/png;base64,${data.photo}`);
            $('#img-photo-edit-modal-medium').attr('src', `data:image/png;base64,${data.photo}`);
            $('#img-photo-edit-modal-small').attr('src', `data:image/png;base64,${data.photo}`);
        }));
    }
    EditProfileInfo() {
        $.post(`/${baseUrl}/profile/editProfile?userID=${sessionStorage.getItem('userid')}`, this.userProfile, () => {
            window.location.reload();
            sessionStorage.setItem('userlogin', this.userProfile.Логин);
        });
    }
    EditProfilePhoto() {
        $.post(`/${baseUrl}/profile/editPhoto`, { 'userID': sessionStorage.getItem('userid'), 'photoData': sessionStorage.getItem('imgData') }, () => {
            window.location.reload();
        });
    }
    EditProfilePassword() {
        $.post(`/${baseUrl}/profile/editPassword`, { 'userID': sessionStorage.getItem('userid'), password: this.userProfile.Пароль }, () => {
            alert('Данные успешно изменены. Авторизуйтесь под новыми данными.');
            $('#span-edit-error').empty();
            Logout();
        }).fail((error) => {
            $('#span-edit-error').text(`${error.responseText}`).css('color', 'red');
        });
    }
}
class Order {
    AddNewOrder(elementHref, pickupPoint) {
        var books = new Book();
        var orderBooks = [];
        document.querySelectorAll(`${elementHref}`).forEach(links => {
            orderBooks.push(books.clearUrlBook(decodeURI(links.getAttribute('href'))));
        });
        $.post(`/${baseUrl}/order/addOrder`, { 'bookName': orderBooks, 'userID': sessionStorage.getItem('userid'), 'selectedPoint': pickupPoint });
    }
    ShowOrders() {
        $.get(`/${baseUrl}/order/getOrder`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.tableOrderFill(data);
        }));
    }
    tableOrderFill(orders) {
        var ordersUser = [];
        var countOrders = 1;
        console.log(orders);
        orders.forEach(orders => {
            var bookName = orders.кодКнигиNavigation.название;
            ordersUser.push('<tr>');
            ordersUser.push(`<th scope="row">${countOrders++}</th>`);
            ordersUser.push(`<td><a id="a-redirect-profile-book" class="btn" href="/book/name?${bookName}"</a>${bookName}</td>`);
            ordersUser.push(`<td>${orders.датаЗаказа}</td>`);
            ordersUser.push(`<td>${orders.статус}</td>`);
            ordersUser.push(`<td>${orders.кодПунктаВыдачиNavigation.название}</td>`);
            ordersUser.push('</tr>');
        });
        $('#tbody-profile-table').append(ordersUser.join(""));
    }
}
class PickupPoint {
    ShowPickupPoints() {
        $.get(`/${baseUrl}/pickup/allPickupPoints`, function (data) {
            var pickupPointNames = [];
            data.forEach(data => {
                pickupPointNames.push(`<div class="col-md-2 mt-3 card-wrapper">`);
                pickupPointNames.push(`<div class="card">`);
                pickupPointNames.push(`<div class="card-body">`);
                pickupPointNames.push(`<h5 class="card-title">${data.название}</h5>`);
                pickupPointNames.push(`<p class="card-text">${data.адрес}</p>`);
                pickupPointNames.push(`</div>`);
                pickupPointNames.push(`</div>`);
                pickupPointNames.push(`</div>`);
            });
            $('#div-show-pickup').append(pickupPointNames.join(""));
        });
    }
}
function checkIfFavoriteExists(currentBook) {
    return new Promise((resolve) => {
        $.get(`/${baseUrl}/favorite/existFavorite`, { 'userID': sessionStorage.getItem('userid'), 'bookName': currentBook }, () => {
            resolve(true);
        }).fail(() => {
            resolve(false);
        });
    });
}
function setCookie(name, val) {
    const date = new Date();
    const value = val;
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
    else {
        return "";
    }
}
function deleteCookie(name) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
function readFileAsByteArray(input, callback) {
    const reader = new FileReader();
    const files = $(input).prop('files');
    if (files && files.length > 0) {
        const file = files[0];
        reader.onload = (event) => {
            var _a;
            const arrayBuffer = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const byteArray = new Uint8Array(arrayBuffer);
            callback(byteArray);
        };
        reader.readAsArrayBuffer(file);
    }
}
function byteArrayToBase64(byteArray) {
    return new Promise((resolve) => {
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            }
            else {
                resolve(null);
            }
        };
        reader.readAsDataURL(blob);
    });
}
function Logout() {
    deleteCookie("auth_key");
    deleteCookie("permission");
    sessionStorage.clear();
    window.location.href = "/";
}
$(function () {
    $('#btn-profile-photo-change').on('click', function (event) {
        event.preventDefault();
        readFileAsByteArray($('#input-photo-edit').get(0), (byteArray) => {
            byteArrayToBase64(byteArray).then(base64String => {
                var profile = new Profile();
                sessionStorage.setItem('imgData', base64String);
                profile.EditProfilePhoto();
            });
        });
    });
    $('#btn-form-profile-edit').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-edit').val() == $('#input-form-password-edit-repeat').val()) {
            var passwordEdit = new Profile('', '', '', $('#input-form-password-edit').val().toString());
            passwordEdit.EditProfilePassword();
        }
        else {
            $('#span-edit-error').text('Пароли должны быть одинаковыми.').css('color', 'red');
        }
    });
    $('#btn-profile-information-edit').on('click', function (event) {
        event.preventDefault();
        var profile = new Profile($('#input-form-edit-name').val().toString(), $('#input-form-edit-surname').val().toString(), $('#input-form-edit-login').val().toString(), '');
        profile.EditProfileInfo();
    });
    $('#btn-order-clear').on('click', function (event) {
        event.preventDefault();
        var cart = new Cart();
        cart.ClearCart();
    });
    $('#btn-logout-profile').on('click', function () {
        Logout();
    });
    $('#btn-favorite-show').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            $('#div-favorite-list').empty();
            var favorite = new Favorite();
            favorite.ShowListFavorite();
        }
        else {
            window.location.href = "/";
            alert("Войдите в профиль для сохранение книги в избранное.");
        }
    });
    $('#btn-favorite-about-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            var favorClass = new Favorite();
            if ($('#btn-favorite-about-book').text().includes('Добавить')) {
                favorClass.AddToFavorite($('#h2-title-about-book').text());
            }
            else {
                favorClass.RemoveFromFavorite($('#h2-title-about-book').text());
            }
        }
        else {
            window.location.href = "/";
            alert("Войдите в профиль для сохранение книги в избранное.");
        }
    });
    $('#btn-cart-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            var cart = new Cart();
            cart.AddCartItem($('#h2-title-about-book').text(), Number.parseInt($('#input-quantity-about-book').val().toString()));
        }
        else {
            window.location.href = "/";
            alert("Войдите в профиль для сохранение книги в корзину.");
        }
    });
    $(document).ready(function () {
        if (getCookie('permission') == '1')
            $('#a-admin-panel').removeAttr('style');
        $('#p-user-login').text("Войти");
        if (window.location.href.includes('/book/name')) {
            var bookByName = new Book();
            bookByName.createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));
        }
        if (sessionStorage.getItem('userlogin') != null) {
            $('#p-user-login').text(`Добро пожаловать - ${sessionStorage.getItem('userlogin')}`);
            $('#btn-login').removeAttr('data-bs-toggle data-bs-target').attr('href', '/profile');
        }
        switch (window.location.href.substring((window.location.href.indexOf('8') + 1))) {
            case '/': {
                var books = new Book();
                books.AllBook();
                $.get(`/${baseUrl}/pickup/allPickupPoints`, ((data) => { sessionStorage.setItem('pickup_point_data', JSON.stringify(data)); }));
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
        var selectedPickupPoint = $('#select-pickup-point option:selected').index();
        order.AddNewOrder('#a-redirect-cart-about-book', (selectedPickupPoint + 1));
    });
    $('#btn-form-login').on('click', function (event) {
        event.preventDefault();
        var enter = new Authentication('', '', $('#input-form-login-auth').val().toString(), $('#input-form-password-auth').val().toString());
        enter.Login();
        if ($('#span-login-error').text().toString() == "") {
            $('#div-login-modal').modal('hide');
        }
    });
    $('#btn-form-register').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-register').val() == $('#input-form-password-repeat').val()) {
            var register = new Authentication($('#input-form-surname-register').val().toString(), $('#input-form-name-register').val().toString(), $('#input-form-username-register').val().toString(), $('#input-form-password-register').val().toString());
            register.Register();
        }
        else {
            $('#span-register-error').text("Пароли должны быть одинаковые").css('color', 'red');
        }
    });
});
//# sourceMappingURL=app.js.map