$(function () {

    $('#btn-show-genre').on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: `${baseUrl}/genre/getGenres`,
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true
        }).done(function (data) {
            genreTableFll(data);
        });
    });

    $('#btn-add-genre').on('click', function (event) {
        event.preventDefault();
        var genre = {
            НазваниеЖанра: $('#input-genre-name-add').val()
        };
        $.ajax({
            url: `${baseUrl}/genre/addGenre`,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(genre),
            async: true
        }).done(function () {

        });
    });
    function selectGenreFill(data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push(`<option value="${data[i].кодАвтора}">${data[i].фио}</option>`);
        }
        $('#select-author-list').append(arr.join('\n'));
    }

    function genreTableFll(data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            $('#tableGenre').empty();
            var arr = [];
            arr.push('<tr>');
            arr.push('<th>Код жанра</th>');
            arr.push('<th>Название жанра</th>');
            arr.push('</tr>');
            for (var i = 0; i < data.length; i++) {
                arr.push('<tr>');
                arr.push(`<td>${data[i].кодЖанра}</td>`);
                arr.push(`<td>${data[i].названиеЖанра}</td>`);
                arr.push('</tr>');
            }
            $('#tableGenre').append(arr.join('\n'));
        }
    }
});