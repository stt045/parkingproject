'use strict'

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
	/*
	 * This function highlights the parking structure the user selects. This is an indication to the user
	 * to know which one he has selected. 
	 */
	$(".options li, .settings th").click(function() {
		console.log("listitem clicked");
		var color = $( this ).css("background-color");

		// If current color is white, turn to something else
		if(color == "rgba(0, 0, 0, 0)" || color == "rgb(255, 255, 255)") {
			$(".options li, .settings th").css("background", "white");
			$(this).css("background", "yellow");
		} else {
			$(this).css("background", "white");
		}
	})
})

function initializePage() {
	console.log("Javascript Connected!");
}