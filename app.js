var express = require('express'),
  cons = require('consolidate'),
  nunjucks = require('nunjucks'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

var view_paths = [
  path.join(__dirname,'views'),
  path.join(__dirname, 'node_modules', 'gn_components', 'views')
];

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(view_paths));


env.express(app);

// all environments

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', cons.nunjucks);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// development only

/**
 * Routes
 */

app.get('/', function(req,res) {
  res.render('index');
});
