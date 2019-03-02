var data = require("../data.json");

exports.addReminder = function(req, res) {    
	data["viewAlt"] = false;

	var newReminder = {
		"reminderTime": req.query.reminder,
		"classTime": req.query.time,
		"day": req.query.day
	};
	
	data.reminders.push(newReminder);
	res.render('reminders', data);
 }

exports.viewAlt = function(req, res){
	data["viewAlt"] = true;

	var newReminder = {
		"reminderTime": req.query.reminder,
		"classTime": req.query.time,
		"day": req.query.day
	};
	
	data.reminders.push(newReminder);
  	res.render('viewAlt', data);
};