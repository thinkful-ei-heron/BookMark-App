// https://github.com/thinkful-ei-heron/BookMark-App.git

import bookMarks from './Store.js';
import api from './api.js';
//import Store from './Store.js';

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
    //renderBookmarkList();
  });
};

//this needs to find the ID from the element clicked. this will be used for both the expansion and the delete. 
const getIdFromElement = function (item) {
  return $(item)
    .closest('.js-bookmark')
    .data('id');
};

const handleDelete = function () {
  $('.placeholder').on('click',' .delete', event => {
    //console.log('ran');
    event.preventDefault();
    const id = event.currentTarget.id;
    console.log(id);
    api.deleteItem(id)
      .then(() => {
        bookMarks.findAndDelete(id);
        renderBookmarkList();
      })
      .catch(error => {
        bookMarks.error = true;
        console.log(error.message);
      });
    // render the updated shopping list
    

  });
};
console.log(bookMarks);

const handleExpand = function(){
  $('main').on('click', '.js-bookmark ',  event => {
    event.preventDefault();
    console.log('i clicked');
    let targetId = bookMarks.findById(event.currentTarget.id);
    //console.log(event.currentTarget);
    $(event.currentTarget).html(`
    <div>
    <p>${targetId.title}</p>
    <p><a href="${targetId.url}">Visit Site</a></p>
    <p>${targetId.desc}</p>
    <p class="delete" id="${targetId.id}"> <span>delete</span></p>
    </div>
    `);
    handleDelete();
  });
};
handleExpand();

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
        // renderBookmarkList();
        //renderBookmarkList();
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
  //console.log('ran');
  if (title){
    $('.placeholder').append(`
  <div class="js-bookmark" id="${id}">
        <p class="expand">${title} |  ${rating}</p>
        <p class="delete" id="${id}"> <span>delete</span></p>
  </div>
  `);
  }
};
//console.log(bookMarks);
// function that renders the list
// function that renders the add
const render = function() {
  if (bookMarks.adding){
    //console.log('true');
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
        <input type="text"  name="description"  placeholder="Description of bookmark">
      </div>
      <button type="reset" class="cancel-button" id="cancel-button">Cancel</button>
      <button type="submit" class="submit-button" id="submit-button">Submit</button>
  </fieldset>
  </form>
    `);
  } else{
    //console.log('false');
    $('main').html(
      `<section class="main-headers">
      <h3 class="new-bookmark-button"> + New Bookmark </h3>
      <h3 class ="minimum-rating"> Minimum Rating 
        <select id="filter-options" value="1">
          <option value="1" selected="selected"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
          <option value="5"> 5 </option>
        </select></h3>
    </section>
    <section class="placeholder"></section>`
    );
  }
  renderBookmarkList();
  handleDelete();
  
};

const serializeJson = function(form){
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val,name) => o[name]= val);
  return JSON.stringify(o);
};

const renderBookmarkList = function(bookmarks){
  $('.placeholder').html('');  
  //console.log(Store);
  for (let bm of bookMarks.STORE.bookmarks){
    //console.log(bookMarks);
    generateBookmarkElement(
      bm.title, 
      bm.rating,
      bm.id
    );
  }
};


//Possible code for filter.!!!!!!----------------
const handleFilterChange = function(){
  $('select').change( e => {
    console.log('heard the change');
    // const minRating = e.currentTarget.value;
    // console.log(minRating);
    // const filteredItems = bookMarks.filter(b => b.rating >= minRating);
    // renderBookmarkList(filteredItems);
  });
};
handleFilterChange();


// const renderFilteredList = function(){
//   console.log('this ran');
//   let bookmarksList = bookMarks.STORE.bookmarks;
//   for ( let i=0; i < bookmarksList.length; i++){
//     // for now i'm manually entering the filter rating. Need to get user input for this.
//     if(bookmarksList[i].rating >= bookMarks.STORE.filter){
//       generateBookmarkElement(bookmarksList[i].title, bookmarksList[i].rating, bookmarksList[i].id);
//       console.log('renderFilteredList is running');
//       console.log(bookmarksList[i]);
//     } 
//   }
// };



const callListeners = function(){
  //console.log('call listeners');
  //renderBookmarkList();
  render(); 
  handleDelete();
  handleNewBookmarkButton();
  //renderFilteredList();
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