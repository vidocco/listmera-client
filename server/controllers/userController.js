const loginModel = require('../models/loginModel.js');
const registerModel = require('../models/registerModel.js');

module.exports = {
  adminPlaylists: async function (ctx) {
    
  },
  register: async function (ctx) {
    registerModel(ctx.request.body);
    ctx.status = 200;
  }
};