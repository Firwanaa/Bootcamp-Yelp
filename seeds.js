var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment		 = require("./models/comment");
var data = [
	{
		name: "Clouds Blue", 
		image: "https://thefinanser.com/wp-content/uploads/2019/03/Camp.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique purus eu rutrum dapibus. Duis nec iaculis libero. Vivamus nec nisl ac turpis suscipit pulvinar nec quis magna. Pellentesque fringilla, sem sagittis aliquam hendrerit, massa mi bibendum diam, varius efficitur orci nulla et lectus."
	},
	{
		name: "Forest Greene", 
		image: "https://rt-homepage.roadtrippers.com/wp-content/uploads/2019/05/camping_night_tent_stars.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique purus eu rutrum dapibus. Duis nec iaculis libero. Vivamus nec nisl ac turpis suscipit pulvinar nec quis magna. Pellentesque fringilla, sem sagittis aliquam hendrerit, massa mi bibendum diam, varius efficitur orci nulla et lectus."
	},
	{
		name: "Lake Whitee", 
		image: "https://asomammoth.com/wp-content/uploads/2019/06/camping-in-mammoth.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique purus eu rutrum dapibus. Duis nec iaculis libero. Vivamus nec nisl ac turpis suscipit pulvinar nec quis magna. Pellentesque fringilla, sem sagittis aliquam hendrerit, massa mi bibendum diam, varius efficitur orci nulla et lectus."
	}
]


//I wrote this by meself"not following colt or ian", the one below is the one
// function seedDB(){
// 	data.forEach((seed)=>{
// 		Campground.deleteMany({}, function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 		console.log("removed");
// 	});
// 	});
	
// }
function seedDB(){
	//REMOVE ALL CAMPGROUNDS 
	Campground.deleteMany({}, (err) => {
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds");
		// ADD FEW CAMPGROUNDS
	data.forEach((seed) => {
		Campground.create(seed, (err, campground) => {
			if(err){
				console.log(err);
			} else {
				console.log("Added a Campground");
				//Create Comment
				Comment.create(
					{
						text: "This is Great Campground, no coverage",
					    author: "Homer"
					}, (err, comment) => {
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("New Comment Added");
						}
					});
			}
		});
	});
});
	// ADD FEW COMMENTS
}

module.exports = seedDB;