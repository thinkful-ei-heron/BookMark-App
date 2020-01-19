// https://github.com/thinkful-ei-heron/BookMark-App.git

//------- | Import statements | ----------------------------------
import Store from './Store.js';
import api from './api.js';

//------- | Setup Local Store From Server | ----------------------------------

// This function takes the content of the API at the load of the page and populates our LOCALSTORE  with it's contents.
const createLocalStore = function(){
  api.getItems()
    .then(bookmark => Object.assign(Store.LOCALSTORE.bookmarks,bookmark))
    .then(() => Store.LOCALSTORE.bookmarks.forEach(bookmark => {
      bookmark.expanded = false;
      renderBookmarkList();
    }))
    .catch(error => {
      Store.errorMessage(error);
      //render error Message---------------
    });
};

//------- | Listener Statements | ----------------------------------
const handleNewBookmarkButton = function(){
  $('.primary-container').on('click','.new-bookmark-button',function(event){
    event.preventDefault();
    //currently this is removing the code because the bookmark list is in main-headers
    Store.adding = true;
    renderFormOrHeaders();
  });
};

// change the store and render. That's it. 
const handleCancelButton = function(){
  $('.primary-container').on('click','.cancel-button', function(event){
    event.preventDefault();
    Store.adding = false;
    $('#form').remove();
    renderFormOrHeaders();
    renderBookmarkList();
  });
};

const handleExpand = function(){
  $('.primary-container').on('click','.js-bookmark .expand',  event => {
    event.preventDefault();
    let id = event.currentTarget.id;
    for (let i = 0; i < Store.LOCALSTORE.bookmarks.length; i++){
      if(id === Store.LOCALSTORE.bookmarks[i].id){
        Store.LOCALSTORE.bookmarks[i].expanded = !Store.LOCALSTORE.bookmarks[i].expanded;
      } 
    }
    renderBookmarkList();
  });
};

const handleDelete = function () {
  $('.primary-container').on('click','span', event => {
    event.preventDefault();
    let id = event.currentTarget.id;
    api.deleteItem(id)
      .then(() => {
        Store.findAndDeleteBookmark(id);
        renderFormOrHeaders();
        renderBookmarkList();
      })
      .catch(error => {
        Store.error = true;
        console.log(error.message);
      });
  });
};

const handleSubmitButton = function(){
  $('main').submit('#form',event => {
    event.preventDefault();
    let formElement = $('#form')[0];
    api.createItemOnServer(serializeJson(formElement))
      .then((newItem) => {
        Store.addBookmark(newItem);
        Store.adding = false;
        renderFormOrHeaders();
        renderBookmarkList();
      })
      .catch(error => {
        Store.error = true;
        console.log(error.message);
      });
  });
};

const handleBannerReturn = function(){
  $('h1').on('click', event => {
    event.preventDefault();
    Store.adding = false;
    $('#form').remove();
    renderFormOrHeaders();
    renderBookmarkList();
  });
};

//Code for filter ----------------
const handleFilterChange = function(){
  $('.primary-container').on('change','.filter-options', ( event => {
    event.preventDefault(); 
    Store.LOCALSTORE.filter = $('.filter-options').val();
    renderFormOrHeaders();
    renderBookmarkList();
  }));
};

const serializeJson = function(form){
  let formData = new FormData(form);
  let o = {};
  formData.forEach((val,name) => o[name]= val);
  return JSON.stringify(o);
};

//------- | html / content creation and rendering | ----------------------------------
//Expects a single bookmark element
const generateExpandedView = function(bookmark){
  $('.placeholder').append(`
      <div class="bookmark-element js-bookmark expanded" >
        <p class="bookmark-title expand " id="${bookmark.id}">${bookmark.title}</p>
        <a class='link' href="${bookmark.url}" target="_blank">Visit Site</a>
        <p class="bookmark-rating">Rating: ${bookmark.rating}</p>
        <p>Description: ${bookmark.desc}</p>
        <p><span id="${bookmark.id}> - Delete - </span></p>
      </div>
      `);
};

const generateBookmarkCompressedElement = function (bookmark) {
  $('.placeholder').append(`
    <div class="bookmark-element js-bookmark collapsed" id="${bookmark.id}">
      <p class="expand" id="${bookmark.id}">${bookmark.title} / Rating: ${bookmark.rating}</p>
      <p class="delete"> <span id="${bookmark.id}">Delete</span></p>
    </div>
    `);
};

const renderBookmarkList = function(){
  $('.placeholder').html(''); 
  let localBookmarks = Store.LOCALSTORE.bookmarks;
  for (let i = 0; i < localBookmarks.length;  i++){
    if(localBookmarks[i].rating >= Store.LOCALSTORE.filter) {
      if (localBookmarks[i].expanded){
        generateExpandedView(localBookmarks[i]);
      } else {
        generateBookmarkCompressedElement(localBookmarks[i]);
      }
    }
  }
};

const renderFormOrHeaders = function() {
  if (Store.adding){
    $('.primary-container').html(`
    <form class="form" id="form">
    <fieldset class="fieldset">
      <div class='formInput'>
        <label>Title: </label>
        <input type="text" name="title" placeholder="Portfolio" required>
      </div>
      <div class='formInput'>
        <label>URL: </label>
        <input type="url" name="url" placeholder="http://www.mysite.com" required>
      </div>
      <div class='formInput'>
        <label>Rating: </label>
        <select class="rating-selector" name="rating" value="" required>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
        <option value="3"> 3 </option>
        <option value="4"> 4 </option>
        <option value="5"> 5 </option>
        </select>
      </div>
      <div class='formInput'>
        <label>Description: </label>
        <input type="text"  name="desc"  placeholder="Description">
      </div>
    <div class='button-container'>
      <button type="reset" class="cancel-button" id="cancel-button">Cancel</button>
      <button type="submit" class="submit-button" id="submit-button">Submit</button>
</div>
  </fieldset>
  </form>
    `);
  } else{
    $('.primary-container').html(`
      <section class="main-headers">
      <h3 class="new-bookmark-button">New Bookmark</h3>
      <h3 class ="minimum-rating"> Minimum Rating 
      <form class="js-filter-form">
        <select class="filter-options" value="${Store.LOCALSTORE.filter}">
          <option value="0">All</option>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
          <option value="5"> 5 </option>
        </select></h3>
        </form>
    </section>
    <section class="placeholder"></section>`
    );
  }
};

//------- | binding the listeners | ----------------------------------
const callListeners = function(){
  handleNewBookmarkButton();
  handleDelete();
  handleFilterChange();
  handleExpand();
  handleSubmitButton();
  handleCancelButton();
  handleBannerReturn();
};

//------- | Export Default Object | ----------------------------------
export default{
  handleNewBookmarkButton,
  createLocalStore,
  handleDelete,
  handleCancelButton,
  renderBookmarkList,
  callListeners,
  renderFormOrHeaders,
};