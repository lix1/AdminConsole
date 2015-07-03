var home = require('../app/controllers/home');

module.exports.initialize = function(app, router) {
  router.get('/', home.index);
  app.use('/', router);
};
