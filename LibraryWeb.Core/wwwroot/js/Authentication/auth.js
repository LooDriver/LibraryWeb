var right = 'Пользователь';

$(function () {

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
        }).done(function () {

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
});