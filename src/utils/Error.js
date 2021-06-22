export default class Error {
    errorCodes = {
        EMAIL_NOT_FOUND: 'Пользователь с таким email не найден',
        INVALID_PASSWORD: 'Неверный пароль',
        auth: 'Пожалуйста, войдите в систему'
    }
    constructor(code) {
        this.code = code
    }
    getErrorStatus () {
        return this.errorCodes[this.code] ? this.errorCodes[this.code] : 'Неизвестная ошибка'
    }
}