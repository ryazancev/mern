const User = require("../../models/User");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res) => {
    try {
        // Нужно для валидации входящих полей
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Если ошибки есть - вернем их на фронт
            return res.status(400).json({
                errors: errors.array(), // массив ошибок
                message: 'Некорректные данные при входе в систему'
            });
        }

        // Получаем поля из запроса
        const { email, password} = req.body;
        // Ищем пользователя в БД.
        const user = await User.findOne({ email }).lean();

        if (!user) {
            // Если такого пользователя нет, то логин мы уже сделать не можем
            return res.status(400).json({message: 'Пользователь не найден'});
        }

        // проверим совпадают ли пароли
        const isMatch = await bcrypt.compare(password, user.password) // Первым параметром пароль от фронта, вторым пароль в БД

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль, попробуйте снова'});
        }

        // Создаем token для защиты
        const token = jwt.sign(
            {userId: user.id}, // Данные, которые будут зашифрованы в токене
            config.get('jwtSecret'), // Секретное поле, которое мы создали в конфиге
            { expiresIn: '1h'} // Через сколько токен умрет (1час)
        );

        // Отвечаем данными на фронт
        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
        console.log(e);
    }
};