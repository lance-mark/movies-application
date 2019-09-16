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
    $('#loader, h1, div').toggleClass('hide');



    let movieList = '';

    movies.forEach(({title, rating, id}) => {
      movieList += `<div class="card bg-dark m-2 shadow"><div id="${id}" class="card-title text-center font-weight-bolder"> - ${title} - rating: ${rating}<button class="delete-btn btn-danger text-white float-right">delete</button>`;
      movieList += `<span class="hide"><br><input type="text" name="title" id="edit-id${id}" value="${title}"><select name="rating" id="rating${id}"><option value="1">1</option><option value="2">2</option><option value="3" selected>3</option><option value="4">4</option><option value="5">5</option></select></span><br><button class="edit-btn card-subtitle m-1 bg-info">Edit</button><button class="hide save-btn btn-success">Save</button></div></div>`;

    });

    // console.log(movieList);

    $('#movieOutput').html(movieList);

    $('.edit-btn').click(function() {
      $(this).parent().children('span').toggleClass('hide');
      $(this).parent().children('button').toggleClass('hide');
    });

    $('.save-btn').click(function () {
      // console.log($(this).parent().attr('id'));
      let movieName = $(this).parent().children().next().children('input').val();
      let movieRating = $(this).parent().children().next().children('select').val();
      let moviesID = parseInt($(this).parent().attr('id'));

      let movieEdit = {title: movieName, rating: movieRating};

      editMovie(movieEdit, moviesID)


    });

    $('.delete-btn').click(function() {
      delete_item($(this).parent().attr("id"));
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


function delete_item(id) {

  $.ajax({
    url: '/api/movies/' + id,
    type: 'DELETE',
    success: function(data) {
      loadMovies();
    }
  });
}

//////////////////////////// Edit Movie  ////////////////////////////////////////////////

function editMovie(input, id) {




  const newMovieEntry = input;
  const url = '/api/movies/' + id;
  const options = {
    method: 'PUT',
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


