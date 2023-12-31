const baseUrl = 'api/Library';

$(function () {
    $('#test').on('click', function () {
        $.ajax({
            url: baseUrl,
            method: 'get',
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                }
            }
        });
    });

    $('#btPos').on('click', function (event) {
        event.preventDefault(); // нужно если чтобы браузер не перезагружал страницу после нажатия на эту кнопку
        $.ajax({
            url: baseUrl,
            method: 'post',
            dataType: 'text',
            data: $('#authorText').val(),
            success: function (result) {
                console.log(result);
            }
        });
    })
});


//function DataPos() {
//    let author = {
//        Фио: "",
//    };
//    author.Фио = document.forms["formPost"].elements["authorText"].value;
//    fetch(baseUrl, {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json;charset=utf-8'
//        },
//        body: JSON.stringify(author),
//    }).catch(exp => console.error(exp));
//}
//function DataDelete() {
//    let author = {
//        id: -1,
//    };
//    author.id = (Number)(document.forms["formDelete"].elements["authorDelete"].value);
//    fetch(baseUrl + "/" + author.id, {
//        method: 'DELETE',
//        headers: {
//            'Content-Type': 'application/json;charset=utf-8'
//        },
//        body: JSON.stringify(author),
//    }).catch(exp => console.error(exp));
//}