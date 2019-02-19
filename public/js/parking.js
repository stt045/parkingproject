'use strict'


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
	var currLot = "";
	console.log(sessionStorage.getItem("curr")); // delete

	// Setting parking state
	if(sessionStorage.getItem("curr") == null) {
		// Do nothing
	}else {
		var num = sessionStorage.getItem("curr");
		var x = document.getElementById(num);

		$(x).css("background", "#4CAF50");
		$(x).css('color', 'white');
	}


	/*
	 * This function highlights the parking structure the user selects. This is an indication to the user
	 * to know which one he has selected. 
	 */
	$(".settings th, .permits li").click(function() {
		var color = $( this ).css("background-color");

		// If current color is white, turn to something else
		if(color == "rgba(0, 0, 0, 0)" || color == "rgb(255, 255, 255)") {
			$(".settings th, .permits li").css("background", "white");
			$(".settings th, .permits li").css("color", "black");
			$(this).css("background", "#4CAF50");
			$(this).css('color', 'white');
		} else {
			$(this).css("background", "white");
			$(this).css('color', 'black');
		}
	})

	// Specifically for parking alerts
	$(".options li").click(function() {
		var color = $( this ).css("background-color");

		// If current color is white, turn to something else
		if(color == "rgba(0, 0, 0, 0)" || color == "rgb(255, 255, 255)") {
			$(".options li").css("background", "white");
			$(".options li").css("color", "black");
			$(this).css("background", "#4CAF50");
			$(this).css('color', 'white');

			// Assign current lot
			currLot = $(this).find("#name").text();
			var message = "Now receiving alerts for " + currLot;
			
			// Setting session ID
			var lotId = this.id;
			console.log("lotID : " + lotId); // delete later
			sessionStorage.setItem("curr", lotId);
			console.log("Session Item: " + sessionStorage.getItem("curr")); // delete later
			
			// Parking alerts		
			swal({
			  	title: "Parking Alerts",
			  	text: message,
			  	icon: "info",
			  	buttons: true,
			  	dangerMode: true,
			})
			.then((willDelete) => {
			  	if (willDelete) { // Pressed OK
			    	// Store parking lot value
			  	} else { // Pressed Cancel
			    	$(this).css("background", "white");
					$(this).css('color', 'black');
			  	}
			});
			// End parking alert
			
		} else {
			$(this).css("background", "white");
			$(this).css('color', 'black');
			sessionStorage.setItem("curr", null);
			console.log("Session Item: " + sessionStorage.getItem("curr")); // delete later
			
		}
	})


	$(".dropdown-content a").click(function() {
		console.log("clicked dropdown");
		location.reload();
	})
})

function initializePage() {
	console.log("Javascript Connected!");
}