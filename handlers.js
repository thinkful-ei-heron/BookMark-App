// https://github.com/thinkful-ei-heron/BookMark-App.git

import bookMarks from './Store.js';
import api from './api.js';

// function to handle listener for new book mark button
const handleNewBookmarkButton = function(){
  //console.log(STORE.bookmarks[0]);
  //console.log('handle new bookmarks button');
  $('.new-bookmark-button').on('click',function(event){
    event.preventDefault();
    $('.js-bookMarks-list').addClass('hidden');
    $('.main-headers').addClass('hidden');
    bookMarks.adding = true;
    //console.log(typeof STORE.adding);
    renderNewBookmarkForm();
    //console.log(typeof STORE.adding);
    handleCancelButton();
    handleSubmitButton();
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
    .closest('.js-item-element')
    .data('item-id');
};

const handleDeleteButton = function(){
  $('span').on('click', function(item){
    console.log(item);
    //getIdFromElement(item);
  });
};



// does this need to place the new value in the local store, or only in the
// api post call.
const handleSubmitButton = function(){
  // console.log(STORE.STORE.bookmarks);
  $('#form').submit(event => {
    event.preventDefault();
    let formElement = $('#form')[0];
    bookMarks.STORE.bookmarks.push(serializeJson(formElement));
    // console.log(STORE.STORE.bookmarks);
    api.createItem(serializeJson(formElement))
      .then((newItem) => {
        bookMarks.addBookmark(newItem);
      })
      .catch(error => {
        bookMarks.error = true;
        alert(error.message);
      });
    
    $('#form').addClass('hidden');
    $('.js-bookMarks-list').removeClass('hidden');
    $('.main-headers').removeClass('hidden');
  });
};


//render functions
const generateBookmarkElement = function (title, rating,id) {
  if (title){
    $('.js-bookMarks-list').append(`
  <div id="${id}">
        <p>${title} |  ${rating} | <span>X</span></p>
  </div>
  `);
  }
};

// function that renders the list
// function that renders the add
const renderNewBookmarkForm = function() {
  if (bookMarks.adding){
    $('.form').html(`
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
    `
    );
  }
};

const serializeJson = function(form){
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val,name) => o[name]= val);
  return JSON.stringify(o);
};

const renderBookmarkList = function(){
  let bookmarksList = bookMarks.STORE.bookmarks;
  for ( let i=0; i < bookmarksList.length; i++){
    generateBookmarkElement(bookmarksList[i].title, bookmarksList[i].rating, bookmarksList[i].id);
    //console.log(bookmarksList[i]);
  }
};


const callListeners = function(){
  //console.log('call listeners');
  renderBookmarkList(); 
  handleNewBookmarkButton();
};



$(callListeners);

export default{
  handleNewBookmarkButton,
  getIdFromElement,
  handleDeleteButton,
  handleCancelButton,
  renderBookmarkList,
  renderNewBookmarkForm,
  generateBookmarkElement
};