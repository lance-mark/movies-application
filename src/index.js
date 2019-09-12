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


getMovies().then((movies) => {
  console.log('Here are all the movies:');

  $('#loader').css('display', 'none');

  console.log(movies);
  console.log(movies.length);
  let idCount = movies.length;

  let movieList = '';

      movies.forEach(({title, rating}) => {
        movieList += `<div> - ${title} - rating: ${rating}</div>`;

      });

          $('#movieOutput').html(movieList);

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

function addNewMovie() {

}

const newMovieEntry = {title: 'test', rating: '5'};
const url = '/api/movies';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newMovieEntry),
};
fetch(url, options)
    .then(getMovies())
    .catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
});