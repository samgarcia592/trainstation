/* global moment firebase */

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB4Ws5gPo9gNW9x90uXnX6XZ4uqE5QjkUY",
  authDomain: "countdownclicker.firebaseapp.com",
  databaseURL: "https://countdownclicker.firebaseio.com",
  storageBucket: "countdownclicker.appspot.com",
  messagingSenderId: "435604262542"
  };
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
  
  var trainname = ""; 
  var destination = ""; 
  var frequency = "";
  var firsttime = ""; 


  $("#submit").on("click", function(event) {
    event.preventDefault();
    var trainname = $("#train-name").val().trim();
    var destination = $("#destination-name").val().trim();
    var frequency = parseInt($("#train-freq").val().trim()); 
    var firsttime = $("#first-train").val().trim(); 
    
    console.log(trainname);
    console.log(destination);
    console.log(frequency); 
    console.log(firsttime); 

    database.ref().push({
        trainname: trainname,
        destination: destination, 
        frequency: frequency,
        firsttime: firsttime, 
    }); 
});

  // --------------------------------------------------------------
  // At the initial load and subsequent value changes, get a snapshot of the stored data.
  // This function allows you to update your page in real-time when the firebase database changes.
  
    
  
  database.ref().on(
    "child_added",
    function(snapshot) {

    //   console.log(snapshot.val());
           //   First time pushed back 1 year to make sure it comes before current time
    
     var firsttimeconverted = moment(snapshot.val().firsttime, "HH:mm").subtract(1,"years"); 
     console.log(firsttimeconverted);
   
     var currenttime = moment(); 
     console.log("current time: " + moment(currenttime).format ("hh:mm")); 
   
     var difftime = moment().diff(moment(firsttimeconverted), "minutes"); 
     console.log("difference in time: " + difftime); 
   
     var timeremainder = difftime % snapshot.val().frequency; 
     console.log(timeremainder); 
   
     var minutestilltrain = snapshot.val().frequency - timeremainder; 
     console.log("minutes till train: " + minutestilltrain); 
   
     var nexttrain = moment().add(minutestilltrain, "minutes"); 
     console.log("arrival time: " + moment(nexttrain).format("hh:mm")); 

      $("#results").append("<tr><td>" + snapshot.val().trainname + "</td><td>" + snapshot.val().destination + "</td><td>"+ snapshot.val().frequency + "</td><td>" + moment(nexttrain).format("hh:mm") + "</td><td>" + minutestilltrain + "</td></tr>");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  
  // --------------------------------------------------------------
  
  


