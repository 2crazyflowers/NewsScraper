//this scrape is not working yet
$("#scrape-articles").on("click", function(event) {

    $.ajax({
      method: "GET",
      url: "/scrape"
    })
    .then(function (data) {
      console.log(data);
    })
    location.reload();
  });

// Whenever someone clicks a make a comment button
$("#make-comment").on("click", function() {
  // Empty the notes from the note section
  console.log("trying to get info on title");
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='save-comment'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});
// When you click the save-comment button from modal
$("#save-comment").on("click", function(event) {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("comment saved");
  // Run a PUT request to update saved value of article from false to true
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#comment-input").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });
    
  
});


$("body").on("click", "#save-article", function (event) {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("article saved with this id: " + thisId);
  // Run a PUT request to update saved value of article from false to true
  $.ajax({
    method: "PUT",
    url: "/savedarticles/" + thisId,
  })
  // With that done
  .then(function (data) {
    // Log the response
    console.log("suzy lives here");
    location.reload();
  })
  .catch(function (err) {
    console.log("Error in article app.js not working: " + err);
  });
});

$('#saved').on("click", function (event) {
  location.href=('/saved');
});