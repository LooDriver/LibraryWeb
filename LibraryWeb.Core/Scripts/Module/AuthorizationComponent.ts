import { setCookie, getCookie } from '../Utils/cookieUtils';
export default class AuthFacade {

    private static authUrl = '/api/auth';

    public static Login(username: string, password: string) {

        $.post(`${this.authUrl}/login`, { 'username': username, 'password': password }, ((data) => {
            setCookie("auth_key", data.auth_key);
            setCookie("permission", data.role);

            sessionStorage.setItem('userlogin', username);
            sessionStorage.setItem('userid', data.userID);
            this.handleSuccess();

        })).fail((error) => {
            this.handleError(error.responseText, $('#span-login-error'));
        });
    }

    public static Register(surname: string, name: string, username: string, password: string) {
        $.post(`${this.authUrl}/register`, { 'surname': surname, 'name': name, 'username': username, 'password': password }, (() => {
            window.location.reload();
        })).fail((error) => {
            this.handleError(error.responseText, $('#span-login-error'));
        });
    }

    private static handleError(errorMessage: string, errorElement: JQuery<HTMLElement>) {
        errorElement.text(errorMessage).css('color', 'red');
    }

    private static handleSuccess() {
        if (getCookie('permisson') == "1") { $('#a-admin-panel').css('display', 'inline'); }
        ($('#div-login-modal') as any).modal('hide');
        window.location.reload();
    }
}