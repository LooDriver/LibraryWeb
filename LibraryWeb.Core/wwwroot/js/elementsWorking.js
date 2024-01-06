$(function () {
    $('#btn-author-table').on('click', function (event) {
        event.preventDefault();

        $('#author-table').toggleClass('d-none');
    });
    $('#btn-form-add').on('click', function () {

        $('#form-add-author').collapse('show');

        $('#form-edit-author').collapse('hide');
    });

    $('#btn-form-edit').on('click', function () {

        $('#form-edit-author').collapse('show');

        $('#form-add-author').collapse('hide');
    });
});