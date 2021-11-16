const { check } = require('express-validator');

module.exports = [
    // Валидация почты
    check('email', 'Некорректный email') // Второй параметр - сообщение на фронт
        .isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
        .isLength({ min: 6 }) // Проверяем длину пароля
]