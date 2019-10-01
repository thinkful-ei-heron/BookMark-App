// https://github.com/thinkful-ei-heron/BookMark-App.git



import STORE from './bookMarks.js';

// function to handle listener for new book mark button
const handleNewBookmarkButton = function(){
  //console.log(STORE.bookmarks[0]);
  //console.log('handle new bookmarks button');
  $('.new-bookmark-button').on('click',function(event){
    event.preventDefault();
    $('.js-bookMarks-list').addClass('hidden');
    $('.main-headers').addClass('hidden');
    STORE.adding = true;
    console.log(typeof STORE.adding);
    renderNewBookmarkForm();
    //console.log(typeof STORE.adding);
    handleCancelButton();
  });
};

const handleCancelButton = function(){
// console.log('handle cancel button');
  $('.cancel-button').on('click', function(event){
    event.preventDefault();
    STORE.adding = false;
    //console.log(STORE.adding);
    $('#form').addClass('hidden');
    $('.js-bookMarks-list').removeClass('hidden');
    $('.main-headers').removeClass('hidden');
    renderBookmarkList();
  });
};

// function to listen for filter button
// adds radio buttons for 1-5 and a filter listener to submit for the filter.

// function to listen for each title to be clicked for expansion

// function to listen for a delete

// function to listen for visiting link when in expanded view
// Store condition when clicked should adjust the condition inside of the clicked element of bookmark/expanded/true;
// This should also listen for the click again and invert it to close the expansion.


// function when the store is in the condition that adding is set to true.
// There are 2 new buttons a cancel to abandon adding new bookmark, and create
// This will gather the information in the form and call the api for an 


//render functions
const generateBookmarkElement = function () {
  $('.js-bookMarks-list').append(`
  <div>
        <p>First bookmark |  5 | <span>X</span></p>
  </div>
  `);
};

// function that renders the list
// function that renders the add
const renderNewBookmarkForm = function() {
  if (STORE.adding){
    $('.form').html(`
    <form id="form">
    <fieldset class="fieldset">
      <div>
        <label>Title</label>
        <input type="text" placeholder="tile of bookmark" required>
      </div>
      <div>
        <label>URL</label>
        <input type="url" placeholder="http://www.abc.com" required>
      </div>
      <div>
        <label>Rating</label>
        <input type="number" min="1" max ="5" required>
      </div>
      <div>
        <label>Description</label>
        <textarea type="text"  row="2" name="Description" placeholder="Description of bookmark"></textarea>
      </div>
      <button type="reset" class="cancel-button" id="cancel-button">Cancel</button>
      <button type="submit" class="submit-button" id="submit-button">Submit</button>
  </fieldset>
  </form>
    `
    );
  }
};

console.log(typeof STORE.bookmarks);

const renderBookmarkList = function(){
  // console.log(STORE.bookmarks[0].url);
  // let bookmarksList = STORE.bookMarks;
  // for ( let i=0; i < bookmarksList.bookMarks; i++){
  //   console.log('running');
  // }

};


const callListeners = function(){
  //console.log('call listeners');
  renderBookmarkList(); 
  handleNewBookmarkButton();
};



$(callListeners);

export default{
  handleNewBookmarkButton,
  handleCancelButton,
  renderBookmarkList,
  renderNewBookmarkForm,
  generateBookmarkElement
};