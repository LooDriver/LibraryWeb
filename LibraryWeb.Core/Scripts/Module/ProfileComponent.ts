import { Logout } from '../main'

export default class Profile {

    private static profileUrl = '/api/profile';

    public static ShowProfileInfo() {
        $.get(`${this.profileUrl}/profileInformation`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            $('#input-form-edit-login').val(`${data.login}`);
            $('#input-form-edit-surname').val(`${data.surname}`);
            $('#input-form-edit-name').val(`${data.name}`);

            $('#img-photo-profile').attr('src', `data:image/png;base64,${data.photo}`);
            $('#img-photo-edit-modal').attr('src', `data:image/png;base64,${data.photo}`);
            $('#img-photo-edit-modal-medium').attr('src', `data:image/png;base64,${data.photo}`);
            $('#img-photo-edit-modal-small').attr('src', `data:image/png;base64,${data.photo}`);
        }));
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

    public static EditProfilePassword(password: string) {
        $.post(`${this.profileUrl}/editPassword`, { 'userID': sessionStorage.getItem('userid'), 'password': password }, () => {
            alert('Данные успешно изменены. Авторизуйтесь под новыми данными.');
            $('#span-edit-error').empty();
            Logout();
        }).fail((error) => {
            $('#span-edit-error').text(`${error.responseText}`).css('color', 'red');
        });
    }
}