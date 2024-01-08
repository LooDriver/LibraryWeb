const baseUrl = 'api';

var focusedOne = false;
var authorId = -1;

$(function () {

    $(document).ready(function () {
        /*        $('#li-admin-list').css('display', 'none');*/
        if (window.location.href.indexOf('/') !== -1) {
            $.ajax({
                url: `${baseUrl}/books/allBooks`,
                method: 'get',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true
            }).done(function (data) {

                var htmlLines = [];
                tilesFiller(htmlLines, data.books, data.genres, data.authors);

            }).fail(function (handleError) {
                console.log(handleError);
            });
        }
    });

    $('#test-btn').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: `${baseUrl}/author/getAuthors`,
            method: 'get',
            dataType: 'json',
            async: true
        }).done(function (data) {
            tableFiller(data);
        });
    });
    $('#tableAuthor').on('click', '#btn-table-add', function () {
        var newRow = '<tr>' +
            '<td><input type="text" size="1"/></td>' +
            '<td><input type="text"/></td>' +
            '<td><button class="btn-table-save">Сохранить</button></td>' +
            '<td><button class="btn-table-cancel">Отмена</button></td>' +
            '</tr>';
        $('#tableAuthor tbody').append(newRow.join('\n'));
    });

    // Обработчик отмены добавления
    $('#tableAuthor').on('click', '.btn-table-cancel', function () {
        $(this).closest('tr').remove();
    });

    $('#btn-add-author').on('click', function (event) {
        event.preventDefault();
        let author = {
            Фио: $('#input-author-name-add').val()
        };

        $.ajax({
            url: `${baseUrl}/author/addAuthor`,
            method: 'post',
            data: JSON.stringify(author),
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function () {
            $('#span-add-done').text('Успешно добавлено');
        });
    });

    $('#select-author-list').on('change', function () {
        authorId = $('#select-author-list option:selected').val();
        $('#input-author-name-edit').val($('#select-author-list option:selected').text());
    });

    $('#select-author-list').on('focus', function () {
        if (focusedOne) {

        }
        else {
            $.ajax({
                url: `${baseUrl}/author/getAuthors`,
                method: 'get',
                dataType: 'json',
                async: true
            }).done(function (data) {
                focusedOne = true;
                selectFiller(data);
            })
        }
    });

    $('#btn-edit-author').on('click', function (event) {
        event.preventDefault();
        if ($('#input-author-name-edit').val().length > 0) {
            let author = {
                Фио: $('#input-author-name-edit').val(),
                кодАвтора: authorId
            };
            $.ajax({
                url: `${baseUrl}/author/editAuthor`,
                method: 'put',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(author),
                async: true
            }).done(function () {
                $('#span-edit-done').text("Успешно отредактировано");
            });
        } else {
            $('#span-edit-done').text("Поле для редактирование не может быть пустым").css('color', 'red');
        }
    });

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

    $('#btn-form-search').on('click', function (event) {
        event.preventDefault();

        var searchText = $('#input-text-search').val();

        $('.col-md-4').each(function () {
            var tileDescriptionText = $(this).find('.tile-book').text().toLowerCase();

            if (tileDescriptionText.includes(searchText.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#tileContainer').on('click', '.btn-about-book', function (event) {
        event.preventDefault();

        var bookTitle = $(this).closest('.tile').find('.tile-book').text();

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

    function tableFiller(data) {
        var arr = [];
        arr.push('<tr>');
        arr.push('<th>Код автора</th>');
        arr.push('<th>ФИО автора</th>');
        arr.push('<th colspan="2">Функции БД</th>');
        arr.push('</tr>');
        for (var i = 0; i < data.length; i++) {
            arr.push('<tr>');
            arr.push(`<td><p>${data[i].кодАвтора}</p></td>`);
            arr.push(`<td><p>${data[i].фио}</p></td>`);
            arr.push(`<td><button id="btn-table-delete">Удаление</button></td>`);
            arr.push(`<td><button id="btn-table-edit">Редактирование</button></td>`);
            arr.push('</tr>');
        }
        arr.push('<tr>');
        arr.push('<td><input type="text" size="1"/></td>');
        arr.push('<td><input type="text"/></td>');
        arr.push('<td><button id="btn-table-add">Добавить</button>');
        arr.push('</tr>');
        $('#tableAuthor').append(arr.join('\n'));
    }

    function tilesFiller(arr, books, genres, authors) {
        var arr = []; // Создаем один массив для всех элементов

        for (var i = 0; i < books.length; i++) {
            arr.push('<div class="col-md-4">');
            arr.push('<div class="tile">');
            arr.push(`<img src="data:image/png;base64,${books[i].обложкакниги}" width="50" height="50" alt="Обложка книги ${books[i].название}">`);
            arr.push('<div class="tile-content">');
            arr.push(`<div class="tile-book">${books[i].название}</div>`);
            arr.push(`<div class="tile-author">${authors[i].фио}</div>`);
            arr.push(`<div class="tile-genre">${genres[i].названиеЖанра}</div>`)
            arr.push('<button class="btn-about-book">Подробнее</button>');
            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
        }

        // Обернем массив в .row и добавим его в #tileContainer
        $('#tileContainer').append('<div class="row">' + arr.join('') + '</div>');
    }

    function selectFiller(data) {
        var optionsConfig = [];
        for (var i = 0; i < data.length; i++) {
            optionsConfig.push(`<option value="${data[i].кодАвтора}">${data[i].фио}</option>`);
        }
        $('#select-author-list').append(optionsConfig.join('\n'));
    }
});
