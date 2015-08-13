var home = require('../app/controllers/home'),
  intro = require('../app/controllers/intro'),
  hospital = require('../app/controllers/hospital');

module.exports.initialize = function(app, router) {
  router.get('/', home.index);

  app.get('/intro', intro.all);
  app.post('/intro', intro.create);
  app.put('/intro', intro.update);
  app.delete('/intro/:id', intro.delete);

  app.get('/hospital', hospital.all);
  app.get('/hospital/:id', hospital.get);
  app.post('/hospital', hospital.create);
  app.put('/hospital', hospital.update);
  app.delete('/hospital/:id', hospital.delete);

  app.get('/adminConsole', function(req, res){
    res.render('index.jade');
  });
  app.get('/adminConsole/*', function(req, res){
    res.render('index.jade');
  });

  app.use('/', router);


};
