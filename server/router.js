const Router = require('koa-router');
const router = new Router();
const spotifyController = require('./controllers/spotifyController.js');
const userController = require('./controllers/userController.js');

// sign-up
router.get('/api/access', spotifyController.auth);
router.post('/api/register', spotifyController.register);
// grab users playlists

// router.get('/login', userController.login);
// router.post('/register', userController.register);
module.exports = router;
