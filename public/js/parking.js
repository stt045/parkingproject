'use strict'


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	var currLot = "";

	// disable start using parknow button 
	$(document.getElementById("startUsing")).attr("disabled","disabled");

	//console.log("curr session is: " + sessionStorage.getItem("curr")); // delete
	//console.log("condition is: " + sessionStorage.getItem("notification"));
	
	// Psuedo Parking notification interval alerts
	if(sessionStorage.getItem("notification") == "true") { // start timer
 		interval();
	}

	/*
	// Pseudo Reminders Notification interval alerts
	if(sessionStorage.getItem("enableReminder") == "true") { // start timer
 		console.log("reminder is on");
	}
	*/

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

		var button = document.getElementById("startUsing");
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

			// start using parknow button turns green (clickable)
			$(button).css("background-color", "#4CAF50");
			$(button).removeAttr("disabled");

		} else { // Deselection
			$(this).css("background", "white");
			$(this).css('color', 'black');

			sessionStorage.setItem("permit", null);
			console.log("current permit is: " + sessionStorage.getItem("permit")); 

			// start using parknow button turns back to grey (disabled)
			$(button).css("background-color", "#878b91");
			$(button).attr("disabled", "disabled");
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
	// Toggle Reminder Switch
	$(".onoffswitch-label").click(function() {
		console.log("reminder is toggled");
		
		if(currentState == "false") {
			currentState == "true";
		}else {
			currentState == "false";
		}
		sessionStorage.setItem("enableReminder", currentState);
		location.reload();
	});
	*/

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
				sessionStorage.setItem("currLot", currLot);
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
				    	sessionStorage.setItem("notification", "true");
				    	console.log("parking interval on");
				    	location.reload();
				  	} else { // Pressed Cancel
				    	$(this).css("background", "white");
						$(this).css('color', 'black');
						sessionStorage.setItem("notification", "false");
						console.log("parking interval off");

						$(this).css("background", "white");
						$(this).css('color', 'black');
						sessionStorage.setItem("curr", null);
						console.log("curr session is: " + sessionStorage.getItem("curr"));

						location.reload();
				  	}
				});
				// End parking alert
			} else {
				$(this).css("background", "white");
				$(this).css('color', 'black');
				sessionStorage.setItem("curr", null);
				console.log("curr session is: " + sessionStorage.getItem("curr")); // delete later

				sessionStorage.setItem("notification", "false");
				console.log("parking interval off");
				location.reload();
				
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

		var firstTime = 1; 
	// reminders page - delete a reminder 
	$("#leftOption").click(function() {
		console.log("edit/done clicked");
			
		var leftBtn = document.getElementById("leftOption");
		var option = $(leftBtn).text();

		var deleteBtns = document.getElementsByClassName("reminderList");
		var span; 

		if (option == "edit") {
			console.log("toggle from edit to done");
			$(leftBtn).text("done");

			if (firstTime == 1) {

				var i; 
				for (i = 0; i < deleteBtns.length; i++) {
				  span = document.createElement("SPAN");
				  var txt = document.createTextNode("\u00D7");
				  span.className = "close";
				  span.appendChild(txt);
				  $(span).css("position", "relative");
				  $(span).css("top", "-138px");
				  $(span).css("right", "5px");
				  deleteBtns[i].appendChild(span);
				}

				var j; 
				var close = document.getElementsByClassName("close");
				console.log("delete:" + close.length); //TODO delete
				for (j = 0; j < close.length; j++) {
			  		close[j].onclick = function() {
			   			 var div = this.parentElement;
			  			 div.style.display = "none";
			  		}
				}

				firstTime = 0; 

			} else {
				var btn = document.getElementsByClassName("close");
				$(btn).css("visibility", "visible"); 	
			}


		} else {
			console.log("toggle from done to edit");
			$(leftBtn).text("edit");

			var btn = document.getElementsByClassName("close");
			$(btn).css("visibility", "hidden"); 	

		} // end if else	

	}) // end delete reminder / done-edit toggling 

})

function interval() {
	// Start psuedo alert timer

	// Change the spot count to 0
	var num = sessionStorage.getItem("curr");
	var x = document.getElementById(num);

	setInterval(function(){ 
		swal({
			  	title: "Parking Alert",
			  	text: sessionStorage.getItem("currLot") + " is full",
			  	icon: "warning",
			  	dangerMode: true,
			})

		var sound = new Audio("sounds/honk.mp3");
		sound.play();

		$(x).find(".num").find(".number").text("0");

	}, 5000);
}


function initializePage() {
	console.log("Javascript Connected!");
}
