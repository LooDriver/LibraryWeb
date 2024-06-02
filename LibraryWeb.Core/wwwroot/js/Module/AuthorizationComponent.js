import { setCookie, getCookie, deleteCookie } from '../Utils/cookieUtils';
class AuthFacade {
    static Login(username, password) {
        if (username !== '' && password !== '') {
            $.post(`${this.authUrl}/login`, { 'username': username, 'password': password }, ((data) => {
                setCookie("auth_key", data.auth_key);
                setCookie("permission", data.role);
                sessionStorage.setItem('userlogin', username);
                sessionStorage.setItem('userid', data.userID);
                this.handleSuccess();
            })).fail((error) => {
                this.handleError(`<span>${error.responseText}</span><br>`, $('#div-login-error-message'));
            });
        }
        else {
            this.handleError(`<span>Оба поля обязательны к заполнению.</span>`, $('#div-login-error-message'));
        }
    }
    static Register(surname, name, username, password) {
        $.post(`${this.authUrl}/register`, { 'surname': surname, 'name': name, 'username': username, 'password': password }, (() => {
            window.location.reload();
        })).fail((error) => {
            this.handleError(`<span>${error.responseText}</span><br>`, $('#div-register-error-message'));
        });
    }
    static RecoveryAccount(accountName) {
        if (accountName != '') {
            $.post(`${this.authUrl}/validationAccount`, { 'username': accountName }, (() => {
                sessionStorage.setItem('userlogin-recovery', accountName);
                this.clearErrorMessage($('#div-recovery-code'));
                this.clearErrorMessage($('#div-recovery-error-message'));
                this.generatedCode = `${this.getRandomNumber(1000, 9999)}`;
                $('#btn-code-confirm').removeAttr('style');
                $('#div-recovery-code').append(`<div class="mb-3">Код для восстановления аккаунта - ${this.generatedCode}<div>`);
            })).fail((error) => {
                this.handleError(`<div class="mb-3"><label>${error.responseText}</label><div>`, $('#div-recovery-error-message'));
            });
        }
        else {
            this.handleError('<span>Логин является обязательным к заполнению.</span>', $('#div-recovery-error-message'));
        }
    }
    static LogoutAccount() {
        deleteCookie("auth_key");
        deleteCookie("permission");
        sessionStorage.clear();
        window.location.href = "/";
    }
    static VerificationCode(codeInput) {
        if (codeInput == this.generatedCode) {
            $('#btn-form-recovery').text('Восстановить');
            this.createChangePassword();
            return true;
        }
        this.handleError('<span>Код неверный. Проверьте правильность введенного кода.</span>', $('#div-recovery-error-message'));
    }
    static ChangeRecoveryAccount(password, repeatPassword) {
        if (password == repeatPassword) {
            $.post(`${this.authUrl}/recoveryAccount`, { 'username': sessionStorage.getItem('userlogin-recovery'), 'newPassword': password }, (() => {
                sessionStorage.removeItem('userlogin-recovery');
                alert('Данные для входа данного аккаунта изменены.\nИспользуйте новые данные для входа');
                window.location.reload();
            })).fail(() => {
                sessionStorage.removeItem('userlogin-recovery');
            });
        }
        else {
            this.handleError('<span>Пароли должны быть одинаковыми.</span>', $('#div-error-password-message'));
        }
    }
    static handleError(errorMessage, errorElement) {
        errorElement.empty();
        errorElement.append(errorMessage).css('color', 'red');
    }
    static handleSuccess() {
        if (getCookie('permisson') == "1") {
            $('#a-admin-panel').show();
        }
        $('#div-login-modal').modal('hide');
        window.location.reload();
    }
    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
    }
    static clearErrorMessage(errorElement) {
        errorElement.empty();
    }
    static createChangePassword() {
        const passwordForm = `
            <div class="mb-3">
                  <label for="input-form-password-recovery" class="form-label">Пароль</label>
                  <input type="password" class="form-control" id="input-form-password-recovery">

                  <label for="input-form-repeat-password-recovery" class="form-label">Повторите пароль</label>
                  <input type="password" class="form-control" id="input-form-repeat-password-recovery">
            </div>
            <div id="div-error-password-message"></div>
        `;
        $('#div-recovery-main-content-modal').empty();
        $('#div-recovery-main-content-modal').append(passwordForm);
    }
}
AuthFacade.authUrl = '/api/auth';
AuthFacade.generatedCode = '';
export default AuthFacade;
