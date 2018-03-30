  
  //timestamp?
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqNNPbGEYokW6CsCvArHwzau7s2AOtR5E",
    authDomain: "train-scheduler-f8637.firebaseapp.com",
    databaseURL: "https://train-scheduler-f8637.firebaseio.com",
    projectId: "train-scheduler-f8637",
    storageBucket: "",
    messagingSenderId: "1040738735193"
  };
  firebase.initializeApp(config);

  let database = firebase.database()

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
       arrival: time 
    }

//push new train object to Firebase - database push
    database.ref().push(newTrain);

//clear inputs
})


//after the click, new call to the database to retrieve trains and add to the DOM 
//call the information first!
//following the call, handle the data (database.ref) add all of the data to the variables, make the data (add var for each piece of data)
//similar to above,all things getting back from database, snapshot.val.name.etc 
//available so that it can be avaible to the selector

database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());
});



//manipulate numbers before re-appending 

//moment.js to use time calcs
//create table data & rows (html) through backticks 