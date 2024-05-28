import Auth from './Module/AuthorizationComponent';
import Comment from './Module/CommentComponent';
import Book from './Module/BooksComponent';
import Favorite from './Module/FavoriteComponent';
import Order from './Module/OrderComponent';
import Pickup from './Module/PickupPointComponent';
import Cart from './Module/CartComponent';
import Profile from './Module/ProfileComponent';
//Загрузка компонентов для корректной работы сайта

//Загрузка компонента для работы с "куки"
import { getCookie } from './Utils/cookieUtils';
import PickupPoint from './Module/PickupPointComponent';

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
        readFileAsByteArray(($('#input-photo-edit').get(0) as HTMLInputElement), (byteArray) => {
            byteArrayToBase64(byteArray).then(base64String => {
                sessionStorage.setItem('imgData', base64String);
                Profile.EditProfilePhoto();
            });
        });
    });

    $('#btn-form-profile-edit').on('click', function (event) {
        event.preventDefault();
        if ($('#input-form-password-edit').val().toString() != '' && $('#input-form-password-edit-repeat').val().toString() != '') {
            Profile.EditProfilePassword($('#input-form-password-edit').val().toString(), $('#input-form-password-edit-repeat').val().toString());
        }
        else {
            $('#div-error-change-message').empty();
            $('#div-error-change-message').append('<span>Оба поля являются обязательными к заполнению.').css('color', 'red');
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
        Auth.LogoutAccount();
    });

    $('#btn-favorite-show').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            $('#div-favorite-list').empty();
            Favorite.ShowListFavorite();
        } else {
            $('#div-favorite-list').text('Здесь пока ничего нету, для того чтобы добавить книгу в избранное нужно зайти в свои профиль');
        }
    });

    $('#btn-favorite-about-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            if ($('#btn-favorite-about-book').text().includes('Добавить')) {
                Favorite.AddBookToFavorite($('#h2-title-about-book').text());
            } else {
                Favorite.RemoveFromFavorite($('#h2-title-about-book').text());
            }
            
        } else {
            alert("Войдите в профиль для сохранение книги в избранное.");
        }

    });
    $('#btn-cart-book').on('click', function (event) {
        event.preventDefault();
        if (getCookie("auth_key") != "") {
            if ($('#btn-cart-book').text().includes('Добавить')) {
                Cart.AddNewCartItem($('#h2-title-about-book').text(), Number.parseInt($('#span-information-quantity').text().toString()));
            }
            else {
                Cart.DeleteCartItem($('#h2-title-about-book').text());
            }
        } else {
            alert("Войдите в профиль для сохранение книги в корзину.");
        }
    });


    $(document).ready(function () {

        const currentUrl = window.location.href.substring((window.location.href.indexOf('8') + 1));

        if (getCookie('permission') === '1') $('#a-admin-panel').removeAttr('style');

        $('#p-user-login').text(sessionStorage.getItem('userlogin') ? `Добро пожаловать - ${sessionStorage.getItem('userlogin') }` : 'Войти');

        if (window.location.href.includes('/book/name')) Book.createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));

        if (sessionStorage.getItem('userlogin')) $('#btn-login').removeAttr('data-bs-toggle data-bs-target').attr('href', '/profile');

        switch (currentUrl) {
            case '/': {
                Book.GetAllBooks();
                break;
            }
            case '/cart': {
                PickupPoint.SetPickupPointData();
                Cart.ShowCartList();
                Cart.selectFillPickupPoint();
                break;
            }
            case '/profile': {
                Order.ShowOrders()
                Profile.ShowProfileInfo();
                break;
            }
            case '/pickup-point': {
                Pickup.ShowPickupPoints();
                break;
            }
        }
    });

    $('#btn-code-verification').on('click', function (event) {
        event.preventDefault();
        Auth.RecoveryAccount($('#input-form-username-recovery').val().toString());
    });

    $('#btn-form-recovery').on('click', function (event) {
        event.preventDefault();
        if ($('#btn-form-recovery').text().includes('Восстановить')) {
            if ($('#input-form-password-recovery').val().toString() != '' && $('#input-form-repeat-password-recovery').val().toString() != '') {
                Auth.ChangeRecoveryAccount($('#input-form-password-recovery').val().toString(), $('#input-form-repeat-password-recovery').val().toString());
            }
            else {
                $('#div-error-password-message').empty();
                $('#div-error-password-message').append('<span>Оба поля являются обязательными к заполнению.').css('color', 'red');
            }
        }
    });

    $('#btn-code-confirm').on('click', function (event) {
        event.preventDefault();
        var values = $('.div-input-recovery-code input').map(function () {
            return $(this).val();
        }).get().join('');

        Auth.VerificationCode(values);
    });

    $(document).on('click', '#a-redirect-cart-about-book, #a-redirect-profile-book, #a-redirect-about-book', function (event) {
        event.preventDefault();
        Book.GetCurrentBookByName(Book.clearUrlBook(decodeURI(this.getAttribute('href'))));
    });

    $('#tbody-cart-items').on('click', '#btn-delete-cart-item', function (event) {
        event.preventDefault();
        Cart.DeleteCartItem($(this).closest('tr').find('.td-book-name').text());

    });

    $('#input-range-quantity-about-book').on('change input', function (event) {
        $('#span-information-quantity').text($(event.target).val().toString());
    });

    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();
        Book.GetCurrentBookByName($(this).closest('.tile').find('.tile-book').text());

    });
    $('#btn-order-success').on('click', function (event) {
        event.preventDefault();
        Order.AddNewOrder(($('#select-pickup-point option:selected').index() + 1));
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

    $('#section-users-comments').on('click','.a-redirect-comment-user-profile', function (event) {
        event.preventDefault();
        var username = $(this).closest('.a-redirect-comment-user-profile').find('.author').text();
        sessionStorage.setItem('commentUsername', username);
        window.location.href = "/profile";
        Profile.ShowProfileInfo();
    });
});