
var data = require("../data.json");
/*
 * GET reminders page.
 */
exports.view = function(req, res){
  	res.render('reminders', data);
};

exports.viewAlt = function(req, res){
  	res.render('viewAlt', data);
};