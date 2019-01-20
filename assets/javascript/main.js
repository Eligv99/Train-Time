// Initialize Firebase
var config = {
  apiKey: "AIzaSyDXI_KSB5FTqeh-l0unOpc4LDas7ZEUGZU",
  authDomain: "t-schedule-cdc5b.firebaseapp.com",
  databaseURL: "https://t-schedule-cdc5b.firebaseio.com",
  projectId: "t-schedule-cdc5b",
  storageBucket: "t-schedule-cdc5b.appspot.com",
  messagingSenderId: "305847227904"
};
firebase.initializeApp(config);

// reference the database
var database = firebase.database();

// console.log(database);

// database.ref().on('value', function(snapshot){
//   console.log(snapshot.val());
// });

// database.ref('/newList').push({
//   name:'eli Train'

// });


// when the submit button is clicked 
$("#submitTrain").on("click", function(event){
  
  // provent it to load the page
  event.preventDefault();

  // Global Scope Variables
  var train = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var time =  moment($("#startTimeInput").val(), "hh:mm, HH:mm").format("hh:mm");
  var frequence = $("#frequencyInput").val().trim();

  // console loggin our variables
  console.log(train);
  console.log(destination);
  console.log(time);
  console.log(frequence);

  
  // Create a new object and push it to the database
	var newTrain = {
		name: train,
		dest: destination,
		first: time,
		freq: frequence,
	}

  database.ref().push(newTrain);

  // Clear your value on the form
  $("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#startTimeInput").val("");
	$("#frequencyInput").val("");
  

  // checking for integers
  if (typeof time === 'number' && typeof frequence === 'number'){
    alert("Is a number")

    $("#startTimeInput").val("");
    $("#frequencyInput").val("");
  }
  else {
    alert("Not a number")
  }

  return false;
  
});

var currentTime = moment();



database.ref().on("child_added", function (childSnapshot) {

  console.log(childSnapshot);
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  var row = $("<tr>");
  row.append($("<td>" + trainName + "</td>"))
  row.append($("<td>" + destination + "</td>"))
  row.append($("<td>" + frequency + "</td>"))
  row.append($("<td>" + moment(nextTrain).format("hh:mm a") + "</td>"))
  row.append($("<td>" + tMinutesTillTrain + "<td>"))

  $("#trainRows").append(row);
});

// database.ref().on('child_added', function(childSnapshot){

//   // console log
//   console.log(childSnapshot.val());
//   // console.log(currentTime._d);
//   // console.log("current time: " + moment(currentTime).format("hh:mm a"));

//   var Newname = childSnapshot.val().name;
//   var Newdestination = childSnapshot.val().dest;
//   var firstTime = childSnapshot.val().first;
//   var tFrequency = childSnapshot.val().freq;

//   // Log everything that's coming out of snapshot
//   console.log(childSnapshot.val().name);
//   console.log(childSnapshot.val().dest);
//   console.log(childSnapshot.val().first);
//   console.log(childSnapshot.val().freq);

//   console.log(tFrequency);

//   // // Assumptions
//   // var tFrequency = 3;

//   // // Time is 3:30 AM
//   // var firstTime = "03:30";

//   // First Time (pushed back 1 year to make sure it comes before current time)
//   var firstTimeConverted = moment(firstTime).format("HH:mm");

//   var fTime = firstTimeConverted._i;

//   console.log(firstTimeConverted);

//   // Current Time
//   var currentTime = moment();
//   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//   // Difference between the times
//   var diffTime = moment().diff(moment(fTime), "minutes");
//   console.log("DIFFERENCE IN TIME: " + diffTime);

//   // Time apart (remainder)
//   var tRemainder = diffTime % tFrequency;
//   console.log(tRemainder);

//   // Minute Until Train
//   var tMinutesTillTrain = tFrequency - tRemainder;
//   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//   // Next Train
//   var nextTrain = moment().add(tMinutesTillTrain, "mm");
//   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  

//   // // adds the real time data to the HTML
//   $("#trainRows").append("<tr>" + "<td>" + Newname + "</td>" + "<td>" + Newdestination + "</td>" + "<td>" +  tFrequency  +"</td>" + "<td>" + nextTrain + "</td>" + "<td>" + tRemainder + "</td>"+ "</tr>");
       

// });
