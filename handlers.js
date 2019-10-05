// https://github.com/thinkful-ei-heron/BookMark-App.git

//------- | Import statements | ----------------------------------
import Store from './Store.js';
import api from './api.js';






//------- | Setup Local Store From Server | ----------------------------------
// I'm unsure where this would land in the Model, View Controller method.
// This function takes the content of the API at the load of the page and populates our LOCALSTORE  with it's contents.
let createLocalStore = function(){
  let i=0;
  api.getItems()
    .then(bookmark => Object.assign(Store.LOCALSTORE.bookmarks,bookmark))
    .then(() => Store.LOCALSTORE.bookmarks.forEach(bookmark => {
      bookmark.expanded = false;
      i++;
      generateBookmarkCompressedElement(bookmark);
      console.log(`API loaded this into the Store ${Store.LOCALSTORE.bookmarks[i].title}`);
    }))
    .catch(error => {
      Store.errorMessage(error);
      //render error Message---------------
    });
};



//------- | Listener Statements | ----------------------------------
//Need to review the best practice for the render statement.
let handleNewBookmarkButton = function(){
  $('.primary-container').on('click','.new-bookmark-button',function(event){
    event.preventDefault();
    //currently this is removing the code because the bookmark list is in main-headers
    $('.main-headers').detach();
    Store.adding = true;
    renderFormOrHeaders();
    renderBookmarkList();
    handleSubmitButton();
    handleCancelButton();
  });
};

// change the store and render. That's it. 
let handleCancelButton = function(){
  $('.cancel-button').on('click', function(event){
    event.preventDefault();
    Store.adding = false;
    $('#form').remove();
    renderFormOrHeaders();
    renderBookmarkList();
  });
};


// Currently not working. 
let handleExpand = function(){
  $('.primary-container').on('click','.js-bookmark .expand',  event => {
    event.preventDefault();
    let id = event.currentTarget.id;
    for (let i = 0; i < Store.LOCALSTORE.bookmarks.length; i++){
      if(id === Store.LOCALSTORE.bookmarks[i].id){
        //console.log(id + Store.LOCALSTORE.bookmarks[i].expanded);
        Store.LOCALSTORE.bookmarks[i].expanded = true;
        //console.log(id + Store.LOCALSTORE.bookmarks[i].expanded);
      } 
      //showExpanded();
      renderBookmarkList();
    }
  });
};

const idOfClickedElement = function(){
  $('.primary-container').on('click','.expand', event => {
    event.preventDefault();
    let id = event.currentTarget.id;
    return id;
  });
};




let handleDelete = function () {
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

let handleSubmitButton = function(){
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


//Possible code for filter.!!!!!!----------------
let handleFilterChange = function(){
  $('.primary-container').on('change','.filter-options', ( event => {
    event.preventDefault(); 
    Store.LOCALSTORE.filter = $('.filter-options').val();
    renderFormOrHeaders();
    renderBookmarkList();
  }));
};



let serializeJson = function(form){
  let formData = new FormData(form);
  let o = {};
  formData.forEach((val,name) => o[name]= val);
  return JSON.stringify(o);
};


const showExpanded = function(){
  for(let i=0; i < Store.LOCALSTORE.bookmarks.length; i++){
    if(Store.LOCALSTORE.bookmarks.expanded){
      console.log(Store.LOCALSTORE.bookmarks[i]);
    }
  }
};




const generateExpandedView = function(bookmark){
  $('.bookmark-element').after(`
      <li class="bookmark-element">
      <p class="bookmark-title">${bookmark.title}</p>
      <a href="${bookmark.url}">Visit Site</a>
      <p class="bookmark-rating">Rating | ${bookmark.rating} | </p>
      <p>Description:${bookmark.desc}</p>
      <p><span id="${bookmark.id}> - Delete - </span></p>
    </li>
  `);
};



//------- | html / content creation and rendering | ----------------------------------
//Expects a single bookmark element
let generateBookmarkCompressedElement = function (bookmark) {
  if(bookmark.rating >= Store.LOCALSTORE.filter) {
    $('.placeholder').append(`
    <div class="bookmark-element js-bookmark" id="${bookmark.id}">
      <p class="expand" id="${bookmark.id}">${bookmark.title} |  ${bookmark.rating}</p>
      <p class="delete"> <span id="${bookmark.id}"> - Delete - </span></p>
    </div>
    `);}
};

let renderBookmarkList = function(){
  $('.placeholder').html('');  
  let localBookmarks = Store.LOCALSTORE.bookmarks;
  for (let i = 0; i< localBookmarks.length;  i++){
    if (localBookmarks[i].expanded){
      generateExpandedView(localBookmarks[i]);
    }
    generateBookmarkCompressedElement(localBookmarks[i]);
  }
};

let renderFormOrHeaders = function() {
  if (Store.adding){
    $('.primary-container').html(`
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
        <input type="text"  name="desc"  placeholder="Description of bookmark">
      </div>
      <button type="reset" class="cancel-button" id="cancel-button">Cancel</button>
      <button type="submit" class="submit-button" id="submit-button">Submit</button>
  </fieldset>
  </form>
    `);
  } else{
    $('.primary-container').html(`
      <section class="main-headers">
      <h3 class="new-bookmark-button"> + New Bookmark </h3>
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

let callListeners = function(){
  handleNewBookmarkButton();
  handleDelete();
  handleFilterChange();
  handleExpand();
  idOfClickedElement();
};



//------- | Export Default Object | ----------------------------------
export default{
  handleNewBookmarkButton,
  idOfClickedElement,
  createLocalStore,
  handleDelete,
  handleCancelButton,
  renderBookmarkList,
  callListeners,
  renderFormOrHeaders,
};