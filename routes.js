const { Router } = require('express');
const api = require('./controllers/api');
const links = require('./controllers/links');
const redirect = require('./controllers/redirect');
const validators = require('./validators');
const { auth } = require('./middlewares');

const apiRouter = Router();
const linkRouter = Router();
const redirectRouter = Router();

// /api/auth/register
apiRouter.post('/register', validators.auth, api.auth);
// /api/auth/login
apiRouter.post('/login', validators.login, api.login);

// /links/link/generate
linkRouter.post('/generate', auth,  links.generate);
// /links/link/
linkRouter.get('/', auth, links.getLinks);
// /links/link/:id
linkRouter.get('/:id', auth, links.id);

// /t/:code
redirectRouter.get('/:code', redirect);

module.exports = {
    apiRouter,
    linkRouter,
    redirectRouter
};
