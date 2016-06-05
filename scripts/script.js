// I created a new JSON data file, inside it, you will find an array of objects.
// Each object, is each one of you!
// https://raw.githubusercontent.com/devjanaprime/2.4-jQueryAjaxJSON/master/students.json
//
// You first task is to make an AJAX call from the client side app.js, using the .ajax method and
// access the json data through the url above. When successful, it should bring the data back down.
// You will then need to combine that with what you have learned about parsing objects and arrays to
// complete the challenge.
//
// Ajax reference: https://github.com/devjanaprime/2.4-jQueryAjaxJSON/blob/master/scripts/getJsonExample.js
//
// X- What I would like to see on the DOM, is one person at a time represented - the info for the first person
// in the json data.
// X- One the screen should also be Prev and Next buttons, that when pressed, show the
// information for the appropriate person.
// X- These should wrap - prev when on the first person should wrap around to show the last person and vice versa.
// X- Also on the dom should be a display showing the number of people and which is being currently viewed (eg. 2/20)
// X- When a person is displayed, show their name, their city, and their piece of shoutout feedback.
// X- Only one person should be show cased at any given time.
//
// KINDA HARD MODE
// TODO- Add a button for each person - appended to DOM when the json is read in. Clicking any button will
// display that person. Place these between the prev and next buttons.
//
// HARD MODE
// TODO- Include a fade out and fade in animation in-between transitioning people.
//
// PRO MODE
// TODO- Include a timer that moves to the next person if the user is not clicking on next or prev.
// TODO- If the user clicks on next or prev, the timer should be reset. The timer should transition between
// people every 10 seconds.



var count = 0; // start count at 0 to access in array the student displayed on load, count var is incremented/decremented with clicks to next/prev buttons, starting from 1

$( function() {
  $('body').append('<div class="container"></div>'); // add empty div to hold student info
  $('.container').append('<div class="headshot"></div>');
  $('.container').append('<b><p class="name"></p></b>'); // add paragraph for first name
  $('.container').append('<p class="city"></p>'); // add paragraph for city
  $('.container').append('<p class="shoutout"></p>'); // add paragraph for shoutout
  $('.container').append('<button id="prev" class="btn btn-primary">Prev</button>'); // add prev button
  $('.container').append('<span class="indivButtons"></span>'); // to add indiv button per person when displayed on DOM
  $('.container').append('<button id="next" class="btn btn-primary">Next</button>'); // add next button
  $('.container').append('<p class="counter"></p>'); // want to display which # student viewing out of 20, should update when click Next/Prev

      // trying to make own json to host headshots - not working
      // $.ajax({
      //   url: 'https://api.myjson.com/bins/2tlxq',
      //   dataType: 'json',
      //   success: function(response) {
      //     console.log("success from created json file");
      //     $('.headshot').html('<img src="http://henryhall.github.io/Weekend-Project-2/Nu/bethanyjohnson.jpg" alt="adam headshot" width=450px height=300px/>');
      //   }
      // });


      $.ajax({
        url: 'https://raw.githubusercontent.com/devjanaprime/2.4-jQueryAjaxJSON/master/students.json',
        dataType: 'json',
        success: function(response) {
          var headshot = "http://henryhall.github.io/Weekend-Project-2/Nu/" + response.students[0].first_name + response.students[0].last_name + ".jpg";
          $('#headshotURL').attr('src', headshot);

          addStudentInfo();

          // $('.name').text(response.students[0].first_name + " " + response.students[0].last_name);
          // $('.city').text('Representing: ' + response.students[0].city);
          // $('.shoutout').text('Shoutout: ' + response.students[0].shoutout);
          // $('.counter').text((count+1) + '/' + response.students.length);
          // $('.indivButtons').text('<button> response.students[0].first_name </button>'); // trying to create button with person's first name - not working

          $('#next').on('click', function() {
            // for (var i=1; i<response.students.length; i++) { // fix? - sort of works but with one click is strining all the first names, all the last names, all the cities, etc on the web page
              count++; // increment counter text that shows which student you're on

              if (count >= response.students.length) { // when get to end of array, start over at beginning
                count = 0;
              }

              var headshot = "http://henryhall.github.io/Weekend-Project-2/Nu/" + response.students[count].first_name + response.students[count].last_name + ".jpg";
              $('#headshotURL').attr('src', headshot);

              addStudentInfo();

            // } // end of for loop
          }); // end of next click function


          $('#prev').on('click', function() {
            count--; // decrement counter text that shows which student you're on

            if (count == -1) { // wben get to start of array, start over at end
              count = 19;
            }

            var headshot = "http://henryhall.github.io/Weekend-Project-2/Nu/" + response.students[count].first_name + response.students[count].last_name + ".jpg";
            $('#headshotURL').attr('src', headshot);

            addStudentInfo();
          }); // end of prev click function


          function addStudentInfo () { // function that populates name, city, shoutout fields with data of student that index is currently on, also updates which # student viewing out of 20
            $('.name').text(response.students[count].first_name + " " + response.students[count].last_name);
            $('.city').text('Representing: ' + response.students[count].city);
            $('.shoutout').text('Shoutout: ' + response.students[count].shoutout);

            $('.counter').text((count+1) + '/' + response.students.length); // this works! .text wipes whatever it previously said so count is update
          } // end of function that adds in name, city, shoutout, and updates # student currently viewing

      }, // end of success function

      statusCode: { // if request is unsuccessful
                404: function(){
                   alert( 'error connecting to server' );
                } // end 404
               } // end statusCode

  }); // end of ajax function


}); // end of doc ready function
