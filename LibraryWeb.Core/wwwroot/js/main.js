import Auth from './Module/AuthorizationComponent';
import Comment from './Module/CommentComponent';
import Book from './Module/BooksComponent';
import Favorite from './Module/FavoriteComponent';
import Order from './Module/OrderComponent';
import Pickup from './Module/PickupPointComponent';
import Cart from './Module/CartComponent';
import Profile from './Module/ProfileComponent';
import { getCookie, deleteCookie } from './Utils/cookieUtils';
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
export function Logout() {
    deleteCookie("auth_key");
    deleteCookie("permission");
    sessionStorage.clear();
    window.location.href = "/";
}
$(function () {
    $('#btn-new-comment').on('click', function (event) {
        event.preventDefault();
        if (getCookie('auth_key') != "") {
            Comment.PostNewComment($('#textarea-user-comment').val().toString());
        }
        else {
            alert("Войдите для того чтобы оставить комментарии");
        }
    });
    $('#btn-profile-photo-change').on('click', function (event) {
        event.preventDefault();
        readFileAsByteArray($('#input-photo-edit').get(0), (byteArray) => {
            byteArrayToBase64(byteArray).then(base64String => {
                sessionStorage.setItem('imgData', base64String);
                Profile.EditProfilePhoto();
            });
        });
    });
    $('#btn-form-profile-edit').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-edit').val() == $('#input-form-password-edit-repeat').val()) {
            Profile.EditProfilePassword($('#input-form-password-edit').val().toString());
        }
        else {
            $('#span-edit-error').text('Пароли должны быть одинаковыми.').css('color', 'red');
        }
    });
    $('#btn-profile-information-edit').on('click', function (event) {
        event.preventDefault();
        Profile.EditProfileInfo($('#input-form-edit-name').val().toString(), $('#input-form-edit-surname').val().toString(), $('#input-form-edit-login').val().toString());
    });
    $('#btn-order-clear').on('click', function (event) {
        event.preventDefault();
        Cart.ClearCart();
    });
    $('#btn-logout-profile').on('click', function () {
        Logout();
    });
    $('#btn-favorite-show').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            $('#div-favorite-list').empty();
            Favorite.ShowListFavorite();
        }
        else {
            $('#div-favorite-list').text('Здесь пока ничего нету, для того чтобы добавить книгу в избранное нужно зайти в свои профиль');
        }
    });
    $('#btn-favorite-about-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            var favorClass = new Favorite();
            if ($('#btn-favorite-about-book').text().includes('Добавить')) {
                Favorite.AddBookToFavorite($('#h2-title-about-book').text());
            }
            else {
                Favorite.RemoveFromFavorite($('#h2-title-about-book').text());
            }
        }
        else {
            alert("Войдите в профиль для сохранение книги в избранное.");
        }
    });
    $('#btn-cart-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            var cart = new Cart();
            if ($('#btn-cart-book').text().includes('Добавить')) {
                Cart.AddNewCartItem($('#h2-title-about-book').text(), Number.parseInt($('#input-quantity-about-book').val().toString()));
            }
            else {
                Cart.DeleteCartItem($('#h2-title-about-book').text());
            }
        }
        else {
            alert("Войдите в профиль для сохранение книги в корзину.");
        }
    });
    $(document).ready(function () {
        const permission = getCookie('permission');
        const userLogin = sessionStorage.getItem('userlogin');
        const currentUrl = window.location.href.substring((window.location.href.indexOf('8') + 1));
        if (permission === '1')
            $('#a-admin-panel').removeAttr('style');
        $('#p-user-login').text(userLogin ? `Добро пожаловать - ${userLogin}` : 'Войти');
        if (window.location.href.includes('/book/name'))
            Book.createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));
        if (userLogin)
            $('#btn-login').removeAttr('data-bs-toggle data-bs-target').attr('href', '/profile');
        if (!sessionStorage.getItem('pickup_point_data')) {
            $.get(`/api/pickup/allPickupPoints`, data => {
                sessionStorage.setItem('pickup_point_data', JSON.stringify(data));
            });
        }
        switch (currentUrl) {
            case '/': {
                Book.GetAllBooks();
                break;
            }
            case '/cart': {
                Cart.ShowCartList();
                Cart.selectFillPickupPoint();
                break;
            }
            case '/profile': {
                Order.ShowOrders();
                Profile.ShowProfileInfo();
                break;
            }
            case '/pickup-point': {
                Pickup.ShowPickupPoints();
                break;
            }
        }
    });
    $(document).on('click', '#a-redirect-cart-about-book, #a-redirect-profile-book, #a-redirect-about-book', function (event) {
        event.preventDefault();
        Book.GetCurrentBookByName(Book.clearUrlBook(decodeURI(this.getAttribute('href'))));
    });
    $('#tbody-cart-items').on('click', '#btn-delete-cart-item', function (event) {
        event.preventDefault();
        Cart.DeleteCartItem($(this).closest('tr').find('.td-book-name').text());
    });
    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();
        Book.GetCurrentBookByName($(this).closest('.tile').find('.tile-book').text());
    });
    $('#btn-order-success').on('click', function (event) {
        event.preventDefault();
        Order.AddNewOrder('#a-redirect-cart-about-book', ($('#select-pickup-point option:selected').index() + 1));
        Cart.ClearCart();
    });
    $('#btn-form-login').on('click', function (event) {
        event.preventDefault();
        Auth.Login($('#input-form-login-auth').val().toString(), $('#input-form-password-auth').val().toString());
    });
    $('#btn-form-register').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-register').val() == $('#input-form-password-repeat').val()) {
            Auth.Register($('#input-form-surname-register').val().toString(), $('#input-form-name-register').val().toString(), $('#input-form-username-register').val().toString(), $('#input-form-password-register').val().toString());
        }
        else {
            $('#span-register-error').text("Пароли должны быть одинаковые").css('color', 'red');
        }
    });
});
//# sourceMappingURL=main.js.map