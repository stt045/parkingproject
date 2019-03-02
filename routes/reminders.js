
var data = require("../data.json");
/*
 * GET reminders page.
 */
exports.view = function(req, res){
	data["viewAlt"] = false;
  	res.render('reminders', data);
};

exports.viewAlt = function(req, res){
	data["viewAlt"] = true;
  	res.render('viewAlt', data);
};