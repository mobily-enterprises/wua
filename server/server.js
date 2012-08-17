/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    db = require('./db.js'),

    // Pages and routes
    routesData = require('./routes/routesData.js'),
    routesDataAnon = require('./routes/routesDataAnon.js'),
    routesNonData = require('./routes/routesNonData.js'),
    routesPages = require('./routes/routesPages.js'),

    AppErrorHandler = require('./AppErrorHandler.js').AppErrorHandler,
    fs = require('fs'),
    path = require('path');

var app = express();

// Connect to DB
mongoose.connect('mongodb://localhost/bookings');

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');


  // Various middleware
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // Sessions
  app.use(express.cookieParser('woodchucks are nasty animals'));
  app.use(express.session({  secret: 'woodchucks are nasty animals', key: 'sid', cookie: { secure: false }   }));

  //
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(AppErrorHandler);
});

app.configure('development', function(){
  // app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  // app.use(express.errorHandler());
});


/* 
 ****************************************************************
 * PAGES
 ****************************************************************
*/
app.get('/app', routesPages.app);
app.get('/login', routesPages.login);
app.get('/recover', routesPages.recover);
app.get('/register', routesPages.register);

/* 
 ****************************************************************
 * NON-DATA CALLS
 ****************************************************************
*/

app.post('/data/recoverAnon', routesNonData.postRecoverAnon );
app.post('/data/loginAnon', routesNonData.postLoginAnon);
app.post('/data/logout', routesNonData.postLogout);


/* 
 ****************************************************************
 * DATA CALLS -- ANONYMOUS
 ****************************************************************
*/

app.get( '/data/workspacesAnon', routesDataAnon.getWorkspacesAnon );
app.post('/data/workspacesAnon', routesDataAnon.postWorkspacesAnon );
app.get( '/data/usersAnon'     , routesDataAnon.getUsersAnon );


/* 
 ****************************************************************
 * DATA CALLS
 ****************************************************************
*/

app.post( '/data/test', routesData.postTest );




// Create the actual server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


