import { setCookie, getCookie } from '../Utils/cookieUtils';
class AuthFacade {
    static Login(username, password) {
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
    static Register(surname, name, username, password) {
        $.post(`${this.authUrl}/register`, { 'surname': surname, 'name': name, 'username': username, 'password': password }, (() => {
            window.location.reload();
        })).fail((error) => {
            this.handleError(error.responseText, $('#span-login-error'));
        });
    }
    static handleError(errorMessage, errorElement) {
        errorElement.text(errorMessage).css('color', 'red');
    }
    static handleSuccess() {
        if (getCookie('permisson') == "1") {
            $('#a-admin-panel').css('display', 'inline');
        }
        $('#div-login-modal').modal('hide');
        window.location.reload();
    }
}
AuthFacade.authUrl = '/api/auth';
export default AuthFacade;
//# sourceMappingURL=AuthorizationComponent.js.map