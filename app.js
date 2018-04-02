let todaysDate = new Date(); 
let dateTime = moment(todaysDate).format('MMMM Do YYYY, h:mm:ss a');

$("#time-now").html(dateTime); 

  // Initialize Firebase

let config = {
    apiKey: "AIzaSyCqNNPbGEYokW6CsCvArHwzau7s2AOtR5E",
    authDomain: "train-scheduler-f8637.firebaseapp.com",
    databaseURL: "https://train-scheduler-f8637.firebaseio.com",
    projectId: "train-scheduler-f8637",
    storageBucket: "",
    messagingSenderId: "1040738735193"
  };
  firebase.initializeApp(config);

  let database = new firebase.database()

  // Onclick function
  $("#submit").click(function(event) {
    event.preventDefault();
    let name = $("#input-name").val().trim();
    let destination = $("#input-destination").val().trim();
    let time = $("#input-train-time").val().trim();
    let frequency = $("#input-frequency").val().trim();
   

//create a local instance of the train
   
    let newTrain = {
       name: name,
       destination: destination,
       frequency: frequency,
       arrival: time , 
       timeAdded: firebase.database.ServerValue.TIMESTAMP
    }

//push new train object to Firebase - database push
    database.ref().push(newTrain);

//clear function to clear values & allow new values to be entered
    $("#input-name").val("");
    $("#input-destination").val("");
    $("#input-train-time").val("");
    $("#input-frequency").val("");


//clear inputs
})


//after the click, new call to the database to retrieve trains and add to the DOM 
//call the information first!
//following the call, handle the data (database.ref) add all of the data to the variables, make the data (add var for each piece of data)
//similar to above,all things getting back from database, snapshot.val.name.etc 
//available so that it can be avaible to the selector

database.ref().on("child_added", function(snapshot, prevChildKey) {
      console.log(snapshot.val());
      let storedName = snapshot.val().name;
      let storedDestination = snapshot.val().destination;
      let storedArrival = snapshot.val().arrival; 
      let storedFrequency = snapshot.val().frequency;
      console.log(storedName);
      console.log(storedArrival);

    //clear function to clear values & allow new values to be entered

    let timeAdded = snapshot.val().timeAdded;
    let useDateTime = moment(todaysDate).format();
    let minutes = moment().diff(moment.unix(timeAdded), "minutes") % storedFrequency;
    let a = storedFrequency - minutes;
    console.log(minutes);
    let humanTime = moment.duration(a, "minutes").humanize();
    console.log(humanTime);
  
    //create table data & rows (html) 
     $("#train-table > tbody").append("<tr><td>" + storedName + "</td><td>" + storedDestination + "</td><td>" +
     storedFrequency + "</td><td>" + storedArrival + "</td><td>"+ humanTime + "</td><td>");


});





//manipulate numbers before re-appending 

//moment.js to use time calcs

//add amount of minutes to dateTime (value of frequency) to get the next arrival
//if can't add to dateTime add to TIMESTAMP