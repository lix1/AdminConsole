var home = require('../app/controllers/home'),
  intro = require('../app/controllers/intro');

module.exports.initialize = function(app, router) {
  router.get('/', home.index);

  app.get('/intro', intro.all);
  app.post('/intro', intro.create);
  app.put('/intro', intro.update);
  app.delete('/intro/:id', intro.delete);

  app.use('/', router);
};
