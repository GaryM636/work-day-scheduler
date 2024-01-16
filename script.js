$(function () {
  // Save Button Click Listener
  $(".saveBtn").on("click", function () {
    // Get the id of the parent time-block
    var timeBlockId = $(this).parent().attr("id");
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();
    // Save the user input in local storage using the time block id as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply Past, Present, or Future Class
  function updateHourlyClasses() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Loop through each time-block
    $(".time-block").each(function () {
      // Get the hour from the time-block id
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      // Compare with the current hour and apply classes accordingly
      if (timeBlockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call the function to apply classes on page load
  updateHourlyClasses();

  // Update classes every hour
  setInterval(updateHourlyClasses, 3600000); // 3600000 milliseconds = 1 hour

  // Retrieve User Input from Local Storage
  function loadSavedEvents() {
    // Loop through each time-block
    $(".time-block").each(function () {
      // Get the id of the time-block
      var timeBlockId = $(this).attr("id");
      // Retrieve the saved event from local storage using the time-block id
      var savedEvent = localStorage.getItem(timeBlockId);
      // Set the value of the textarea with the saved event
      $(this).children(".description").val(savedEvent);
    });
  }

  // Call the function to load saved events on page load
  loadSavedEvents();

  // Display Current Date
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
