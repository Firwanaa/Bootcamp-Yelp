var express    = require("express");
var router     = express.Router(); 
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", (req, res) => {

	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});	
		}
	});
});

//Create - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
	var name   = req.body.name;
	var price  = req.body.price;
	var image  = req.body.image;
	var desc   = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, price: price, image: image, description: desc, author: author};
	//Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
			console.log(err);
		} else {
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

//SHOW - show more info about one campground
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
		if(err){
		console.log(err);
		} else {
			console.log(foundCampground);
		//render show template with that campground
		res.render("campgrounds/show", {campground: foundCampground});		
		}			
	});	
});

//Edit Cmapground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground});
	 });
});

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	//redirect somewhere(show page)
});

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res, next) => {
	Campground.findByIdAndRemove(req.params.id, (err, campground) => {
		if(err) return next(err);
		
		campground.remove();
			//THE LINE BELOW IS FROM => (Ian YouTube Channel) "Cascade Delete with MongoDB". at min 8 mark.
			//req.flash('success', 'Campground eleted successfully!');
			res.redirect("/campgrounds");	
	});
});


module.exports = router;