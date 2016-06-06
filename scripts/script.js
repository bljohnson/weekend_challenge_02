// X- You first task is to make an AJAX call from the client side app.js, using the .ajax method and
// access the json data through the url above. When successful, it should bring the data back down.
// You will then need to combine that with what you have learned about parsing objects and arrays to
// complete the challenge.
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


var count = 0; // start count at 0 to access student at index 0 on load, count var incremented/decremented with next/prev buttons

$( function() { // doc ready function (shorthand)
      $.ajax({ // AJAX cohort request for students object containing array of objects (students)
        url: 'https://raw.githubusercontent.com/bljohnson/weekend_challenge_02/master/class-roster.json',
        dataType: 'json',
        success: function(cohort) {
          $('body').append('<div class="container"></div>'); // add empty div to hold student info
          $('.container').append('<p class="name"></p>'); // add paragraph for first name
          $('.container').append('<p class="city"></p>'); // add paragraph for city
          $('.container').append('<p class="shoutout"></p>'); // add paragraph for shoutout
          // $('.container').append('<button id="prev" class="btn btn-primary">Prev</button>'); // hard coding this in html for now; add prev button
          // $('.container').append('<span class="indivButtons"></span>'); // hard coding this in html for now; add area between prev and next buttons to append indiv student buttons to
          // $('.container').append('<button id="next" class="btn btn-primary">Next</button>'); // hard coding this in html for now; add next button
          // $('.container').append('<p class="counter"></p>'); // hard coding this in html for now; add viewing # display

          $.ajax({ // AJAX headshots request for headshots object containing array of objects (headshots)
              url: 'https://raw.githubusercontent.com/bljohnson/weekend_challenge_02/master/headshots.json',
              dataType: 'json',
              success: function(photos) {
                addHeadshot(); // display first student's headshot
                addIndividualButtons(); // display first student's indiv button on initial page load
                addStudentInfo(); // display first student's info on initial page load

                nextStudent(); // when next button is clicked...
                previousStudent(); // when prev button is clicked...

              // global functions for use throughout doc
                function addIndividualButtons () { // adds button BUT... TODO clicking them doesn't display that person
               // $('.indivButtons').remove('<button class= "btn btn-primary">' + response.students[count].first_name + '</button>');
                  $('.indivButtons').append('<button class= "btn btn-primary">' + cohort.students[count].first_name + '</button>');
                } // end addIndividualButtons function

                function addHeadshot () { // use photos returned from AJAX headshots request to display each student's headshot in turn
                  var headshot = photos.headshots[count].image;
                  $('#headshotURL').attr('src', headshot);
                } // end addHeadshot function

                function addStudentInfo () { // function that populates text info of student that index is currently on
                  $('.name').text(cohort.students[count].first_name + " " + cohort.students[count].last_name); // add name
                  $('.city').text('Representing: ' + cohort.students[count].city); // add city
                  $('.shoutout').text('Shoutout: ' + cohort.students[count].shoutout); // add shoutout
                  $('.counter').text('(' + (count+1) + '/' + cohort.students.length + ')'); // update viewing # display
                } // end addStudentInfo function

                function nextStudent () { // when next button is clicked...
                  $('#next').click(function() {
                    count++; // increment student being displayed
                    if (count >= cohort.students.length) { // when get to end of array of objects, wrap and start over at beginning
                      count = 0;
                    }
                    addHeadshot(); // display headshot
                    addIndividualButtons(); // display indiv student button -- TODO kind of works - EVERY time next button clicked, adds indiv student button even if already has one
                    addStudentInfo(); // display student's text info
                  }); // end of next click function
                } // end nextStudent function

                function previousStudent () { // when prev button is clicked...
                  $('#prev').click(function() {
                    count--; // decrement student being displayed
                    if (count < 0) { // wben get to beginning of array of objects, wrap and start over at the end
                      count = cohort.students.length - 1;
                    }
                    addHeadshot(); // display headshot
                    // addIndividualButtons(); // TODO not working yet - causes duplication if next button clicked first...
                    addStudentInfo(); // display student's text info
                  }); // end of prev click function
                } // end previousStudent function

              }, // end of success function for AJAX headshots request

              statusCode: { // if AJAX headshots request is unsuccessful
                404: function(){
                  alert( 'error connecting to server' );
                } // end 404 function for unsuccessful AJAX headshots request
              } // end statusCode for unsuccessful AJAX headshots request

            }); // end of AJAX headshots request

        }, // end of success function for AJAX cohort request

        statusCode: { // if AJAX cohort request is unsuccessful
          404: function(){
            alert( 'error connecting to server' );
          } // end 404 function for unsuccessful AJAX cohort request
        } // end statusCode for unsuccessful AJAX cohort request

    }); // end of AJAX cohort request
}); // end of doc ready function
