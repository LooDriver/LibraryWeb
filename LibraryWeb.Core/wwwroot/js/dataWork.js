const baseUrl = 'api/data';
window.addEventListener('load', function () {
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

function tilesFiller(arr, data) {
    var arr = []; // Создаем один массив для всех элементов

    for (var i = 0; i < data.length; i++) {
        arr.push('<div class="col-md-4">');
        arr.push('<div class="tile">');
        arr.push(`<img src="data:image/png;base64,${data[i].обложкаКниги}" width="50" height="50" alt="Обложка книги ${data[i].название}">`);
        arr.push('<div class="tile-content">');
        arr.push(`<div class="tile-description">${data[i].название}</div>`);
        arr.push('<button class="btn About">Подробнее</button>');
        arr.push('</div>');
        arr.push('</div>');
        arr.push('</div>');
    }

    // Обернем массив в .row и добавим его в #tileContainer
    $('#tileContainer').append('<div class="row">' + arr.join('') + '</div>');
}
$(function () {

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
