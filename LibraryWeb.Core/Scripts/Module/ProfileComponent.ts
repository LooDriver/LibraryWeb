import Auth from '../Module/AuthorizationComponent';

export default class Profile {

    private static profileUrl = '/api/profile';

    public static ShowProfileInfo() {
        if (sessionStorage.getItem('userid') != undefined) {
            $.get(`${this.profileUrl}/profileInformation`, { 'userID': sessionStorage.getItem('userid') }, (data) => {
                this.SetupElements(data);
            });
        }
        else if (sessionStorage.getItem('commentUsername') != undefined) {
            $.get(`${this.profileUrl}/commentProfileInformation`, { 'username': sessionStorage.getItem('commentUsername') }, (data) => {
                this.DisableElements();
                this.SetupElements(data);
            });
        }
    }

    public static EditProfileInfo(name: string, surname: string, username: string) {
        $.post(`${this.profileUrl}/editProfile?userID=${sessionStorage.getItem('userid')}`, { 'name': name, 'surname': surname, 'username': username }, () => {
            window.location.reload();
            sessionStorage.setItem('userlogin', username);
        });
    }

    public static EditProfilePhoto() {
        $.post(`${this.profileUrl}/editPhoto`, { 'userID': sessionStorage.getItem('userid'), 'photoData': sessionStorage.getItem('imgData') }, () => {
            window.location.reload();
        });
    }

    public static EditProfilePassword(password: string, repeatPassword:string) {
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

    private static handleError(errorMessage: string, errorElement: JQuery<HTMLElement>) {
        errorElement.empty();
        errorElement.append(errorMessage).css('color', 'red');
    }

    private static validateUserPassword(password: string, repeatPassword: string) {
        return password == repeatPassword;
    }

    private static DisableElements() {

        $('#a-profile-modal-image').removeAttr('data-bs-toggle').removeAttr('data-bs-target');
        $('#btn-profile-information-edit').hide();
        $('#btn-profile-information-password-edit').hide();
        $('#btn-logout-profile').hide();

        $('.form-user-information :input').attr('disabled', 'true');
    }

    private static SetupElements(data) {

        $('#input-form-edit-login').val(`${data.login}`);
        $('#input-form-edit-surname').val(`${data.surname}`);
        $('#input-form-edit-name').val(`${data.name}`);

        $('#img-photo-profile').attr('src', `data:image/png;base64,${data.photo}`);
        $('#img-photo-edit-modal').attr('src', `data:image/png;base64,${data.photo}`);
        $('#img-photo-edit-modal-medium').attr('src', `data:image/png;base64,${data.photo}`);
        $('#img-photo-edit-modal-small').attr('src', `data:image/png;base64,${data.photo}`);
    }

    public static Checker() {
        if (sessionStorage.getItem('userid') != null) {
            return true;
        }
        else if (sessionStorage.getItem('commentUsername') != null) {
            return false;
        }
    }
}