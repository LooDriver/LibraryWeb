var focusedOne = false;
var authorId = -1;
$(function () {

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

    $('#btn-show-author').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: `${baseUrl}/author/getAuthors`,
            method: 'get',
            dataType: 'json',
            async: true
        }).done(function (data) {
            tablesAuthorFiller(data)
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

    $('#btn-delete-author').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: `${baseUrl}/author/deleteAuthor`,
            method: 'delete',
            dataType: 'text',
            data: { 'id': ($('#input-id-author').val()) },
            contentType: 'application/json;charset=utf-8',
            async: true
        });
    });
    function selectFiller(data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push(`<option value="${data[i].кодАвтора}">${data[i].фио}</option>`);
        }
        $('#select-author-list').append(arr.join('\n'));
    }
    function tablesAuthorFiller(data) {
        $('#tableAuthor').empty();
        var arr = [];
        arr.push('<tr>');
        arr.push('<th>Код автора</th>');
        arr.push('<th>ФИО автора</th>');
        arr.push('</tr>');
        for (var i = 0; i < data.length; i++) {
            arr.push('<tr>');
            arr.push(`<td>${data[i].кодАвтора}</td>`);
            arr.push(`<td>${data[i].фио}</td>`);
            arr.push('</tr>');
        }
        $('#tableAuthor').append(arr.join('\n'));
    }
});