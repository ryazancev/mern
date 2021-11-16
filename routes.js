const { Router } = require('express');
const api = require('./controllers/api');
const validators = require('./validators');

const apiRouter = Router();

// /api/auth/register
apiRouter.get('/register',validators, api.auth);

// /api/auth/login
apiRouter.get('/login', api.login);

module.exports = apiRouter;