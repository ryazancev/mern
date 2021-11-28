const { Router } = require('express');
const api = require('./controllers/api');
const validators = require('./validators');

const apiRouter = Router();

// /api/auth/register
apiRouter.post('/register', validators.auth, api.auth);

// /api/auth/login
apiRouter.post('/login', validators.login, api.login);

module.exports = apiRouter;