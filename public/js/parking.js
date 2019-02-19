'use strict'


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();


	var currLot = "";
	console.log("curr session is: " + sessionStorage.getItem("curr")); // delete

	// Setting parking state
	if(sessionStorage.getItem("curr") == "null") {
		// Do nothing
	}else {
		var num = sessionStorage.getItem("curr");
		var x = document.getElementById(num);
		$(x).css("background", "#4CAF50");
		$(x).css('color', 'white');
	}

	// Setting permit state
	if(sessionStorage.getItem("permit") == "null") {
		// Indicate no permit selected
		var y = document.getElementById("parkDisplay");
		$(y).text("no permit");

		// if no permit is selected, all spots should zero out
		$(".num").text("0 spots");

	}else {
		var permID = sessionStorage.getItem("permit");
		var y = document.getElementById("parkDisplay");
		$(y).text(permID);
		console.log("permID: " + permID);
	}

	/*
	 * This function highlights the permit the user selects. This is an 
	 * indication to the user to know which one he has selected. 
	 */
	$(".permits li").click(function() {
		var color = $( this ).css("background-color");

		// Making a selection
		if(color == "rgba(0, 0, 0, 0)" || color == "rgb(255, 255, 255)") {
			$(".permits li").css("background", "white");
			$(".permits li").css("color", "black");
			$(this).css("background", "#4CAF50");
			$(this).css('color', 'white');

			var permitId = this.id;
			sessionStorage.setItem("permit", permitId);
			console.log("current permit is: " + sessionStorage.getItem("permit")); 
		} else { // Deselection
			$(this).css("background", "white");
			$(this).css('color', 'black');

			sessionStorage.setItem("permit", null);
			console.log("current permit is: " + sessionStorage.getItem("permit")); 
		}
	})

	// Permit selector from the settings page
	$(".dropdown-content a").click(function() {
		var color = $( this ).css("background-color");
		console.log("color is: " + color);

		// Making a selection
		if(color == "rgb(241, 241, 241)") {
			var permitId = this.id;
			sessionStorage.setItem("permit", permitId);
			console.log("current permit is: " + sessionStorage.getItem("permit")); 
		}
		location.reload();
	})

	/*
	 * When a parking area is chosen, it is logged in Session Storage and
	 * will alert the user if the would like to receive notifications.
	 * ---------------------------- TODO -------------------------------
	 * Add the actual notifications by using a timer that is still active as you
	 * continue to adventure into other tabs.
	 */
	$(".options li").click(function() {
		var color = $( this ).css("background-color");

		if(sessionStorage.getItem("permit") != "null") {
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
				sessionStorage.setItem("curr", lotId);
				console.log("curr session is: " + sessionStorage.getItem("curr")); // delete later
				
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
				console.log("curr session is: " + sessionStorage.getItem("curr")); // delete later
				
			}
		}else { // Permit is null
			// Alert user to select permit in settings
			swal({
				  	title: "Parking Alerts",
				  	text: "Please select permit within settings",
				  	icon: "warning",
				  	buttons: true,
				  	dangerMode: true,
				})
				.then((willDelete) => {
				  	if (willDelete) { // Pressed OK
				    	// Store parking lot value
				  	} else { // Pressed Cancel
				    	
				  	}
				});
		}	
	})

})

function initializePage() {
	console.log("Javascript Connected!");
}



