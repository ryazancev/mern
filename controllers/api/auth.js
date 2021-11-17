const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        // Нужно для валидации входящих полей
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Если ошибки есть - вернем их на фронт
            return res.status(400).json({
                errors: errors.array(), // массив ошибок
                message: 'Некорректные данные при регистрации'
            });
        }

        // получаем данные которые отправим с фронта
        const { email, password } = req.body;

        // При регистрации проверим есть ли такой email в БД
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' });
        }

        // Шифруем пароль пользователя
        const hashedPassword = await bcrypt.hash(password, 10);
        // Создаем нового пользователя
        const user = new User({ email, password: hashedPassword });
        // Сохраняем в БД
        await user.save();
        res.status(201).json({ message: 'Пользователь создан '});

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
        console.log(e);
    }
};