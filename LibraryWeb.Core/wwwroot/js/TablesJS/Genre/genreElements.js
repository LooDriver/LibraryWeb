$(function () {
    $('#btn-author-table').on('click', function (event) {
        event.preventDefault();

        $('#author-table').toggleClass('d-none');
    });
    $('#btn-form-add').on('click', function () {

        $('#form-add-author').collapse('show');

        $('#form-edit-author').collapse('hide');

        $('#form-delete-author').collapse('hide');

        $('#form-show-author').collapse('hide');
    });

    $('#btn-form-edit').on('click', function () {

        $('#form-edit-author').collapse('show');

        $('#form-add-author').collapse('hide');

        $('#form-delete-author').collapse('hide');

        $('#form-show-author').collapse('hide');
    });
    $('#btn-form-delete').on('click', function () {

        $('#form-edit-author').collapse('hide');

        $('#form-add-author').collapse('hide');

        $('#form-delete-author').collapse('show');

        $('#form-show-author').collapse('hide');
    });
    $('#btn-form-show').on('click', function () {

        $('#form-edit-author').collapse('hide');

        $('#form-add-author').collapse('hide');

        $('#form-delete-author').collapse('hide');

        $('#form-show-author').collapse('show');
    });
});