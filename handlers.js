// https://github.com/thinkful-ei-heron/BookMark-App.git

import bookMarks from './Store.js';
import api from './api.js';

// function to handle listener for new book mark button
const handleNewBookmarkButton = function(){
  //console.log(STORE.bookmarks[0]);
  //console.log('handle new bookmarks button');
  $('.new-bookmark-button').on('click',function(event){
    event.preventDefault();
    //$('.js-bookMarks-list').remove();
    //currently this is removing the code because the bookmark list is in main-headers
    $('.main-headers').remove();
    bookMarks.adding = true;
    //console.log(typeof STORE.adding);
    render();
    //console.log(typeof STORE.adding);
    handleCancelButton();
    handleSubmitButton();
    handleNewBookmarkButton();
  });
};

const handleCancelButton = function(){
// console.log('handle cancel button');
  $('.cancel-button').on('click', function(event){
    event.preventDefault();
    bookMarks.adding = false;
    //console.log(STORE.adding);
    $('#form').addClass('hidden');
    $('.js-bookMarks-list').removeClass('hidden');
    $('.main-headers').removeClass('hidden');
    renderBookmarkList();
  });
};

//this needs to find the ID from the element clicked. this will be used for both the expansion and the delete. 
const getIdFromElement = function (item) {
  return $(item)
    .closest('.js-bookmark')
    .data('id');
};

const handleDelete = function () {

  $('.placeholder').on('click','.js-bookmark', event => {
    //console.log('ran');
    event.preventDefault();
    const id = event.currentTarget.id;
    bookMarks.findAndDelete(id);
    api.deleteItem(id)
      .then(
        renderBookmarkList())
      .catch(error => {
        bookMarks.error = true;
        alert(error.message);
      });
    // render the updated shopping list
  });
  
};



// does this need to place the new value in the local store, or only in the
// api post call.


const handleSubmitButton = function(){
  // console.log(STORE.STORE.bookmarks);
  $('#form').submit(event => {
    event.preventDefault();
    let formElement = $('#form')[0];
    // console.log(STORE.STORE.bookmarks);
    api.createItem(serializeJson(formElement))
      .then((newItem) => {
        bookMarks.addBookmark(newItem);
        renderBookmarkList();
        $('#form').remove();
        bookMarks.adding = false;
        render();
      })
      .catch(error => {
        bookMarks.error = true;
        alert(error.message);
      });
    
    
  });
};


//render functions
const generateBookmarkElement = function (title, rating,id) {
  if (title){
    $('.placeholder').append(`
  <div class="js-bookmark" id="${id}">
        <p>${title} |  ${rating} | <span>X</span></p>
  </div>
  `);
  }
};
console.log(bookMarks);
// function that renders the list
// function that renders the add
const render = function() {
  if (bookMarks.adding){
    console.log('true');
    $('main').html(`
    <form id="form">
    <fieldset class="fieldset">
      <div>
        <label>Title</label>
        <input type="text" name="title" placeholder="tile of bookmark" required>
      </div>
      <div>
        <label>URL</label>
        <input type="url" name="url" placeholder="http://www.abc.com" required>
      </div>
      <div>
        <label>Rating</label>
        <input type="number" name="rating" min="1" max ="5" required>
      </div>
      <div>
        <label>Description</label>
        <textarea type="text"  name="description" row="2" name="Description" placeholder="Description of bookmark"></textarea>
      </div>
      <button type="reset" class="cancel-button" id="cancel-button">Cancel</button>
      <button type="submit" class="submit-button" id="submit-button">Submit</button>
  </fieldset>
  </form>
    `);
  } else{
    console.log('false');
    $('main').html(
      `<section class="main-headers">
      <h3 class="new-bookmark-button"> + New Bookmark </h3>
      <h3 class ="minimum-rating"> Minimum Rating 
        <select class="filter-options">
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
          <option value="5"> 5 </option>
        </select></h3>
    </section>
    <section class="placeholder"></section>`
    );
    // renderBookmarkList();
    renderFilteredList();
    handleDelete();
  }
};

const serializeJson = function(form){
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val,name) => o[name]= val);
  return JSON.stringify(o);
};

const renderBookmarkList = function(){
  console.log('renderBookmark list is running');
  $('.placeholder').html('');
  let bookmarksList = bookMarks.STORE.bookmarks;
  for ( let i=0; i < bookmarksList.length; i++){
    generateBookmarkElement(bookmarksList[i].title, bookmarksList[i].rating, bookmarksList[i].id);
    //console.log(bookmarksList[i]);
  }
};

const renderFilteredList = function(){
  
  let bookmarksList = bookMarks.STORE.bookmarks;
  for ( let i=0; i < bookmarksList.length; i++){
    // for now i'm manually entering the filter rating. Need to get user input for this.
    if(bookmarksList[i].rating >= bookMarks.STORE.filter){
      generateBookmarkElement(bookmarksList[i].title, bookmarksList[i].rating, bookmarksList[i].id);
      console.log('renderFilteredList is running');
      console.log(bookmarksList[i]);
    } 
  }
};



const callListeners = function(){
  //console.log('call listeners');
  renderBookmarkList(); 
  handleDelete();
  handleNewBookmarkButton();
  renderFilteredList();
};



$(callListeners);

export default{
  handleNewBookmarkButton,
  getIdFromElement,
  handleDelete,
  handleCancelButton,
  renderBookmarkList,
  render,
  generateBookmarkElement
};