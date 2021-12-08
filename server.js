const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const { apiRouter, linkRouter, redirectRouter} = require('./routes');
const { setupMiddlewares } = require('./middlewares');

// Различные миддлвары
setupMiddlewares(app);

// Подключаем роут api
app.use('/api/auth', apiRouter);
// Подключаем роут link
app.use('/links/link', linkRouter);
// Подключаем роут redirect
app.use('/t', redirectRouter);

const PORT = config.get('port') || 5000;

async function start() {
    try {
        // Коннектимся к базе данных
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // Запускаем сарвар
        app.listen(PORT, () => {
            console.log('Сарвар запущен на порте 5000');
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
start();

