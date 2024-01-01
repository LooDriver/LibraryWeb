const baseUrl = 'api/Library';

$(function () {
    $('#test').on('click', function () {
        $.ajax({
            url: baseUrl,
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                }
            }
        });
    });

    $('#btPos').on('click', function (event) {
        event.preventDefault(); // нужно если чтобы браузер не перезагружал страницу после нажатия на эту кнопку
        let author = {
            Фио: ""
        };
        author.Фио = $('#authorText').val();
        $.ajax({
            url: baseUrl,
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(author),
            success: function (result) {
                console.log(result);
            }
        });
    })
});