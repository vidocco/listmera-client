const Router = require('koa-router');
const router = new Router();

const spotifyController = require('./controllers/spotifyController.js');
const playlistController = require('./controllers/playlistController.js');

// sign-up/log-in methods
router.get('/api/access', spotifyController.auth);
router.post('/api/register', spotifyController.register);

// playlist methods
router.post('/api/playlist', playlistController.create);
router.get('/api/playlist/:id', playlistController.get);
router.put('/api/playlist/:id', playlistController.collab);
router.post('/api/playlist/:id', playlistController.generate);
router.delete('/api/playlist/:id', playlistController.delete);

module.exports = router;
