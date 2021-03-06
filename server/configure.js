var path = require('path'),
  routes = require('./routes'),
  exphbs = require('express-handlebars'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler');

module.exports = function(app) {
  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials']
  }).engine);
  app.set('view engine', 'jade');

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));

  routes.initialize(app, new express.Router());

  app.use(express.static('public'));

  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }

  return app;
};
