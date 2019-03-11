var data = require("../data.json");

exports.addReminder = function(req, res) {    
	data["viewAlt"] = false;

	var newReminder = {
		"classTime": req.query.time,
		"day": req.query.day
	};
	
	data.reminders.push(newReminder);
	res.render('reminders', data);
 }

