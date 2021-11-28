const { check } = require('express-validator');

module.exports = [
    // Валидация почты
    check('email', 'Введите корректный email') // Второй параметр - сообщение на фронт
        // .normalizeEmail() // приводит мыло к норм виду бЕз ТакОй записи
        .isEmail(),
    check('password', 'Введите пароль')
        .exists() // пароль должен просто существовать

]