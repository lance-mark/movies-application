/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

const $ = require('./jquery-2.2.4');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });


////////////// Load movies from json ////////////////////////////


function loadMovies(){
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    console.log(movies);
    $('#loader').css('display', 'none');

    let movieList = '';

    movies.forEach(({title, rating, id}) => {
      movieList += `<div class="${id}"> - ${title} - rating: ${rating}<button class="${id}">delete</button></div>`;

    });

    console.log(movieList);

    $('#movieOutput').html(movieList);

    $('button').click(function() {
      $(this).parent().css('display', 'none')
    });


  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
}

loadMovies();

////////////////////     Add Movies     /////////////////////////////////////////////////////////////////

$('#submitBTN').click(addNewMovie);

function addNewMovie(e) {
  e.preventDefault();

  let newTitle = $('#add-new-title').val();

  let newRating = $('.add-new-rating').val();


  const newMovieEntry = {title: newTitle, rating: newRating};
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovieEntry),
  };
  fetch(url, options)
      .then(loadMovies())
      .catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
  });
}

//////////////////////    Delete Movies  /////////////////////////////////////////////////


// $('button').click(function() {
//   $(this).css('display', 'none')
// });