const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	session = require("express-session"),
	passport = require("passport"),
	url = require('url'),
	Redis = require('ioredis'),
	RedisStore = require('connect-redis')(session),
	methodOverride = require("method-override"),
	// cookieParser = require("cookie-parser"),
	flash = require("connect-flash"),
	busboy = require("connect-busboy"),
	// imports
	staticAssets = __dirname + "/public",
	authRoutes = require("./routes/auth"),
	indexRoutes = require("./routes/index"),
	profileRoutes = require("./routes/profile"),
	pointsRoutes = require("./routes/points"),
	processRoutes = require("./routes/process"),
	interviewRoutes = require("./routes/interview"),
	crmRoutes = require("./routes/crm"),
	ecrmRoutes = require("./routes/ecrm"),
	linkstoreRoutes = require("./routes/linkstore"),
	backofficeRoutes = require("./routes/backoffice"),
	storageRoutes = require("./routes/storage"),
	blogRoutes = require("./routes/blog"),
	db = require("./db");

if (process.env.REDIS_URL) {
	//var rtg   = require("url").parse(process.env.REDIS_URL);
	//redisAuth = rtg.auth.split(':'); 
	//var redis = require("redis").createClient({ port: rtg.port, host: rtg.hostname, no_ready_check: true, auth_pass: redisAuth[1]});
	// var redis = require("redis").createClient(process.env.REDIS_URL);
} else {
	// var redis = require("redis").createClient();
}
// var redis = require("redis").createClient('redis://omnijoshhh123@ec2-44-203-44-183.compute-1.amazonaws.com:6379');
// var redis = require("redis").createClient({
// 	host: "ec2-44-203-44-183.compute-1.amazonaws.com",
// 	port: 6379,
// 	no_ready_check: true,
// 	auth_pass: 'omnijoshhh123',
// 	logErrors: true,
//   });
// var redis = require("redis").createClient();
//  var redisUrl = url.parse(process.env.REDISTOGO_URL),
// 				redisAuth = redisUrl.auth.split(':');  
// 		app.set('redisHost', rtg.hostname);
// 		app.set('redisPort', rtg.port);
// 		app.set('redisDb', redisAuth[0]);
// 		app.set('redisPass', redisAuth[1]);
// var redis = require("redis").createClient();
require("./passport")

var redisStore = process.env.NODE_ENV === 'production' ?
	new RedisStore({ url: process.env.REDIS_URL }) :
	new RedisStore();

var sessionMiddleware = session({
	store: redisStore,
	secret: "jennifer pak is the bestest",
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 180 * 60 * 1000 }
})
app.use(session({
	secret: 'your-secret-key',  // change this to a secure key
	resave: false,
	saveUninitialized: true,
}));

// Use flash messages
app.use(flash());

app
	.set("port", (process.env.PORT || 3000))
	.set("view engine", "ejs")
	.use(express.static(staticAssets))
	.use(methodOverride("_method"))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(busboy())
	.use(sessionMiddleware)
	.use(passport.initialize())
	.use(passport.session())
	.use(flash())
	.use(function (req, res, next) {
		res.locals.currentUser = req.user;
		res.locals.error = req.flash("error");
		res.locals.success = req.flash("success");
		next();
	})
// var displayContent = function(){
//     redis.get("db", function(err, reply){
//         console.log("db : "+reply);
//         redis.expire("pass", 1);    
//     });
//     redis.on("connect", function(){
// 	redis.set("db", redisAuth[0]);
// 	redis.set("pass", redisAuth[1]);
// 	displayContent();
//     });
// }

// ROUTES
app
	.use(authRoutes)
	.use(indexRoutes)
	.use(profileRoutes)
	.use(pointsRoutes)
	.use(processRoutes)
	.use(interviewRoutes)
	.use(crmRoutes)
	.use(ecrmRoutes)
	.use(linkstoreRoutes)
	.use(backofficeRoutes)
	.use(storageRoutes)
	.use(blogRoutes)

app.listen(app.get("port"), () => {
	console.log("Server is Listening...")
})
