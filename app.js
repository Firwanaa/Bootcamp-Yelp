const express        = require("express"),
	  app            = express(),
 	  bodyParser     = require("body-parser"),
	  mongoose       = require("mongoose"),
	  flash			 = require("connect-flash"),
	  passport       = require("passport"),
	  LocalStrategy  = require("passport-local"),
	  methodOverride = require("method-override"),
	  Campground     = require("./models/campground"),
	  Comment        = require("./models/comment"),
	  User           = require("./models/user"),
	  seedDB	     = require("./seeds");
//requiring routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes       = require("./routes/index");

// mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//db name just after (mongodb://localhost:27017/),i changed it to yelpcamp 
// mongoose.connect(process.env.DATABASEURL || "mongodb://localhost:27017/", { useNewUrlParser: true });app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb+srv://koko:koko1@cluster0-gkasr.mongodb.net/test?retryWrites=true&w=majority', { 
	useNewUrlParser: true,
	useCreateIndex: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();//seed the DB

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Helooooooooomeeee!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( (req, res, next)  => {
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");
	res.locals.success     = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);




app.listen(process.env.PORT, process.env.IP); 
// app.listen(3000, () => { 
//   console.log('YelpCamp Server listening on port 3000'); 
// });
