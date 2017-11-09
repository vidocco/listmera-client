const loginModel = require('../models/loginModel.js');
const registerModel = require('../models/registerModel.js');

//grab user e-mail and check if password and e-mail match, if they do, return the user, else, return error.

module.exports = {
  login: async function (ctx) {
    
  },
  register: async function (ctx) {
    registerModel(ctx.request.body);
    ctx.status = 200;
  }
};