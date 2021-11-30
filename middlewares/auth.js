const jwt = require('jsonwebtoken');
const config = require('config');
// middleware для котроллера

module.exports = (req, res, next) => {
    // OPTIONS - спец метод который проверяет доступность сарвара
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN

        if (!token) {
            res.status(401).json({ message: 'Нет авторизации' });
        }
        // Декодируем токен
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Декодированный токен положим в поле
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' });
    }
};