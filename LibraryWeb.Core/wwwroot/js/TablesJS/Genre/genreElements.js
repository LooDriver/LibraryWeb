$(function () {
    $('#btn-genre-table').on('click', function (event) {
        event.preventDefault();

        $('#genre-table').toggleClass('d-none');
    });
    $('#btn-form-genre-add').on('click', function () {

        $('#form-add-genre').collapse('show');

        $('#form-edit-genre').collapse('hide');

        $('#form-delete-genre').collapse('hide');

        $('#form-show-genre').collapse('hide');
    });

    $('#btn-form-genre-edit').on('click', function () {

        $('#form-edit-genre').collapse('show');

        $('#form-add-genre').collapse('hide');

        $('#form-delete-genre').collapse('hide');

        $('#form-show-genre').collapse('hide');
    });
    $('#btn-form-genre-delete').on('click', function () {

        $('#form-edit-genre').collapse('hide');

        $('#form-add-genre').collapse('hide');

        $('#form-delete-genre').collapse('show');

        $('#form-show-genre').collapse('hide');
    });
    $('#btn-form-genre-show').on('click', function () {

        $('#form-edit-genre').collapse('hide');

        $('#form-add-genre').collapse('hide');

        $('#form-delete-genre').collapse('hide');

        $('#form-show-genre').collapse('show');
    });
});