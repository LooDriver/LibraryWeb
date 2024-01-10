$(function () {
    $('#btn-author-table').on('click', function (event) {
        event.preventDefault();

        $('#author-table').toggleClass('d-none');
    });
    $('#btn-form-author-add').on('click', function () {

        $('#form-add-author').collapse('show');

        $('#form-edit-author').collapse('hide');

        $('#form-delete-author').collapse('hide');

        $('#form-show-author').collapse('hide');
    });

    $('#btn-form-author-edit').on('click', function () {

        $('#form-edit-author').collapse('show');

        $('#form-add-author').collapse('hide');

        $('#form-delete-author').collapse('hide');

        $('#form-show-author').collapse('hide');
    });
    $('#btn-form-author-delete').on('click', function () {

        $('#form-edit-author').collapse('hide');

        $('#form-add-author').collapse('hide');

        $('#form-delete-author').collapse('show');

        $('#form-show-author').collapse('hide');
    });
    $('#btn-form-author-show').on('click', function () {

        $('#form-edit-author').collapse('hide');

        $('#form-add-author').collapse('hide');

        $('#form-delete-author').collapse('hide');

        $('#form-show-author').collapse('show');
    });
});