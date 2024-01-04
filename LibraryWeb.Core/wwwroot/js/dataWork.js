const baseUrl = 'api/data';

$(function () {

    $(document).ready(function () {
        $.ajax({
            url: baseUrl,
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            var htmlLines = [];
            tilesFiller(htmlLines, data);

        }).fail(function (handleError) {
            console.log(handleError);
        });
    });

    $('#btn-form-login').on('click', function (event) {
        event.preventDefault();
        let login = {
            Login: $('#input-form-email').val(),
            Password: $('#input-form-password').val()
        };
        $.ajax({
            url: `${baseUrl}/auth`,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(login),
            async: true
        }).done(function () {
            alert("Успешно");
        }).catch(function (handleError) {
            alert("Неверный логин или пароль");
        })
    });

    $('#btn-form-register').on('click', function (event) {
        event.preventDefault();
        let registerUser = {
            Login: $('#input-form-email-register').val(),
            Password: $('#input-form-password-register').val()
        }
        $.ajax({
            url: `${baseUrl}/register`,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(registerUser),
            async: true

        }).done(function () {
            alert("Успешно");
        }).fail(function () {
            alert("Ошибка");
        });
    });

    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();

        var bookTitle = $(this).closest('.tile').find('.tile-description').text();

        $.ajax({
            url: `${baseUrl}/book`,
            method: 'get',
            dataType: 'json',
            data: { 'name': bookTitle },
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            location.href = `book/name=${data.название}`;
        }).fail(function (handleError) {
            console.log(handleError);
        });
    });

    $('#btPos').on('click', function (event) {
            event.preventDefault(); // нужно если чтобы браузер не перезагружал страницу после нажатия на эту кнопку
            let author = {
                Фио: $('#authorText').val()
            };
            $.ajax({
                url: baseUrl,
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(author)
            }).done(function () {
                alert("Успешно");
            }).fail(function (handleError) {
                console.log(handleError);
            });

        });

    $('#btDel').on('click', function (event) {
            event.preventDefault();
            $.ajax({
                url: baseUrl,
                method: 'delete',
                dataType: 'text',
                async: true,
                data: { 'id': (Number)($('#authorDelete').val()) },
            }).done(function () {
                alert("Успешно");
            }).fail(function (handleError) {
                console.log(handleError);
            });

        });

    $('#btPut').on('click', function (event) {
            event.preventDefault();
            let authors = {
                КодАвтора: -1,
                Фио: ""
            };
            authors.КодАвтора = (Number)($('#authorId').val());
            authors.Фио = $('#authorFio').val();

            $.ajax({
                url: baseUrl,
                method: 'put',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(authors)
            }).done(function () {
                alert("Успешно");
            }).fail(function (errorHandle) {
                console.log(errorHandle);
            });

    });

    function tilesFiller(arr, data) {
        var arr = []; // Создаем один массив для всех элементов

        for (var i = 0; i < data.length; i++) {
            arr.push('<div class="col-md-4">');
            arr.push('<div class="tile">');
            arr.push(`<img src="data:image/png;base64,${data[i].обложкаКниги}" width="50" height="50" alt="Обложка книги ${data[i].название}">`);
            arr.push('<div class="tile-content">');
            arr.push(`<div class="tile-description">${data[i].название}</div>`);
            arr.push('<button class="btn-about-book">Подробнее</button>');
            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
        }

        // Обернем массив в .row и добавим его в #tileContainer
        $('#tileContainer').append('<div class="row">' + arr.join('') + '</div>');
    }
});
