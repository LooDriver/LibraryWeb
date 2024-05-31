import Auth from '../Module/AuthorizationComponent';
class Profile {
    static ShowProfileInfo() {
        $.get(`${this.profileUrl}/profileInformation`, { 'userID': sessionStorage.getItem('userid') }, (data) => {
            this.SetupElements(data);
        });
    }
    static ShowProfileInfoCommentUser() {
        $.get(`${this.profileUrl}/commentProfileInformation`, { 'username': sessionStorage.getItem('commentUsername') }, (data) => {
            this.SetupElements(data);
            this.DisableElements();
        });
    }
    static EditProfileInfo(name, surname, username) {
        $.post(`${this.profileUrl}/editProfile?userID=${sessionStorage.getItem('userid')}`, { 'name': name, 'surname': surname, 'username': username }, () => {
            window.location.reload();
            sessionStorage.setItem('userlogin', username);
        });
    }
    static EditProfilePhoto() {
        $.post(`${this.profileUrl}/editPhoto`, { 'userID': sessionStorage.getItem('userid'), 'photoData': sessionStorage.getItem('imgData') }, () => {
            window.location.reload();
        });
    }
    static EditProfilePassword(password, repeatPassword) {
        if (this.validateUserPassword(password, repeatPassword)) {
            $.post(`${this.profileUrl}/editPassword`, { 'userID': sessionStorage.getItem('userid'), 'password': password }, () => {
                alert('Данные успешно изменены. Авторизуйтесь под новыми данными.');
                Auth.LogoutAccount();
            }).fail((error) => {
                this.handleError(`<span>${error.responseText}</span>`, $('#div-error-change-message'));
            });
        }
        else {
            this.handleError(`<span>Пароли должны быть одинаковыми.</span>`, $('#div-error-change-message'));
        }
    }
    static handleError(errorMessage, errorElement) {
        errorElement.empty();
        errorElement.append(errorMessage).css('color', 'red');
    }
    static validateUserPassword(password, repeatPassword) {
        return password == repeatPassword;
    }
    static DisableElements() {
        $('#a-profile-modal-image').removeAttr('data-bs-toggle').removeAttr('data-bs-target');
        $('#btn-profile-information-edit').hide();
        $('#btn-profile-information-password-edit').hide();
        $('#btn-logout-profile').hide();
        $('#input-form-edit-login').val('*********');
        $('.form-user-information :input').attr('disabled', 'true');
    }
    static SetupElements(data) {
        $('#input-form-edit-login').val(`${data.login}`);
        $('#input-form-edit-surname').val(`${data.surname}`);
        $('#input-form-edit-name').val(`${data.name}`);
        $('#img-photo-profile').attr('src', `data:image/png;base64,${data.photo}`);
        $('#img-photo-edit-modal').attr('src', `data:image/png;base64,${data.photo}`);
        $('#img-photo-edit-modal-medium').attr('src', `data:image/png;base64,${data.photo}`);
        $('#img-photo-edit-modal-small').attr('src', `data:image/png;base64,${data.photo}`);
    }
}
Profile.profileUrl = '/api/profile';
export default Profile;
