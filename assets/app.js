$(document).ready(function(){
	 
	// 1. Link to Firebase
  var config = {
    apiKey: "AIzaSyAJOPqgBbx9t-WVa2SMptsbg6oMDtD6SIA",
    authDomain: "trainscheduler145.firebaseapp.com",
    databaseURL: "https://trainscheduler145.firebaseio.com",
    projectId: "trainscheduler145",
    storageBucket: "trainscheduler145.appspot.com",
    messagingSenderId: "995727459789"
  };

 	firebase.initializeApp(config);

  	var database = firebase.database();


	$("#addTrain").on("click", function(){


		var name = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var time = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var trainfrequency = $("#trainfrequency").val().trim();


		console.log(name);
		console.log(destination);
		console.log(time);
		console.log(trainfrequency);

		 database.ref().set({
			name:  name,
			destination: destination,
			trainTime: time,
			frequency: trainfrequency,
		});

		return false;
	});

	$(database).on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());


		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrain = moment().add(minutes, "m").format("hh:mm A"); 
		

		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td></tr>");

	});
});
