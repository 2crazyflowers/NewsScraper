// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<a href=" + data[i].link + ">" + "<h4 data-id=" + data[i]._id + ">" + data[i].title + "</h4>" + "</a>" + "<br />" + "<p>" + data[i].summary + "</p>" + "<br />" + "<img src=" + data[i].image + ">" + "<hr>");
  }
});
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


// When you click the save-comment button from modal
$("#save-comment").on("click", function(event) {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("comment saved");
  // Run a PUT request to update saved value of article from false to true
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#comment-input").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comment-input").empty();
    });
});

$("#save-article").on("click", function (event) {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("article saved");
  // Run a PUT request to update saved value of article from false to true
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#comment").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comment").empty();
    });
});
