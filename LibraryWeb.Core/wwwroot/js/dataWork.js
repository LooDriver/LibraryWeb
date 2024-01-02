const baseUrl = 'api/data';
$(function () {

    $('#showData').on('click', function (event) {
        event.preventDefault();
                $.ajax({
                    url: baseUrl,
                    method: 'get',
                    contentType: 'application/json;charset=utf-8',
                    async: true
                }).done(function (data) {
                    var htmlLines = [];
                    tableFil(htmlLines, data);
                }).fail(function (handleError) {
                    console.log(handleError);
                });
    });

    function tableFil(arr, data) {

        $('#tableData').empty();
        arr.push('<table>')
        arr.push('<tr><th colspan="3">Авторы</th></tr>');
        arr.push('<tr><th>Код<th>ФИО</th></th></tr>');
        for (var i = 0; i < data.length; i++) {
            arr.push(`<td><th>${i + 1}</th></td>`);
            arr.push(`<td><th>${data[i].фио}</th></td>`);
        }
        arr.push('</table>');
        $('#tableData').append(arr.join('\n'));
    }

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
