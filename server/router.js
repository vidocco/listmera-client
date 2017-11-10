const Router = require('koa-router');
const router = new Router();
const spotifyController = require('./controllers/spotifyController.js');
const userController = require('./controllers/userController.js');
const playlistController = require('./controllers/playlistController.js');

// sign-up
router.get('/api/access', spotifyController.auth);
router.post('/api/register', spotifyController.register);

// playlists
router.post('/api/playlist', playlistController.create);
router.get('/api/playlist/:id', playlistController.get);

// router.get('/login', userController.login);
// router.post('/register', userController.register);
module.exports = router;
