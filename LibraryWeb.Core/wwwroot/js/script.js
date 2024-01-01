const baseUrl = 'api/Library';

$(function () {
    $('#btGet').on('click', function (event) {
        event.preventDefault(); 
        $.ajax({
            url: baseUrl,
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            async: true
        }).done(function (data) {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
            }
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

});