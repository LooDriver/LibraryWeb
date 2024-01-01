const baseUrl = 'api/Library';

$(function () {
    $('#btGet').on('click', function (event) {
        event.preventDefault(); 
        $.ajax({
            url: baseUrl,
            method: 'get',
            contentType: 'application/json;charset=utf-8',
        }).done(function (data) {

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
            data: { 'id': (Number)($('#authorDelete').val()) },
        }).done(function () {
            alert("Успешно");
        }).fail(function (handleError) {
            console.log(handleError);
        });

    });

});