var data = require("../data.json");

exports.addReminder = function(req, res) {    
	// Your code goes here
	var newReminder = {
		"reminderTime": req.query.reminder,
		"classTime": req.query.time,
		"day": req.query.day
	};
	
	data.reminders.push(newReminder);
	console.log(newReminder);
	res.render('reminders', data);
 }