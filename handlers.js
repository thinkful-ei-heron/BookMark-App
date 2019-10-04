// https://github.com/thinkful-ei-heron/BookMark-App.git

//------- | Import statements | ----------------------------------
import Store from './Store.js';
import api from './api.js';






//------- | Setup Local Store From Server | ----------------------------------
// I'm unsure where this would land in the Model, View Controller method.
// This function takes the content of the API at the load of the page and populates our LOCALSTORE  with it's contents.
let createLocalStore = function(){
  api.getItems()
    .then(bookmark => Object.assign(Store.LOCALSTORE.bookmarks,bookmark))
    .then(() => Store.LOCALSTORE.bookmarks.forEach(bookmark => {
      bookmark.expanded = false;
      //console.log(`${bookmark.title} rendered`);
      generateBookmarkElement(bookmark);}))
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
    $('.main-headers').remove();
    Store.adding = true;
    renderFormOrHeaders();
    renderBookmarkList();
  });
};

// change the store and render. That's it. 
let handleCancelButton = function(){
  $('.cancel-button').on('click', function(event){
    event.preventDefault();
    Store.adding = false;
    $('#form').addClass('hidden');
    $('.js-Store-list').removeClass('hidden');
    $('.main-headers').removeClass('hidden');
    //renderBookmarkList();
  });
};

let handleExpand = function(){
  $('main').on('click', '.js-bookmark ',  event => {
    event.preventDefault();
    console.log('i clicked');
    let targetId = Store.findById(event.currentTarget.id);
    $(event.currentTarget).html(`
    <div>
    <p>${targetId.title}</p>
    <p><a href="${targetId.url}">Visit Site</a></p>
    <p>${targetId.desc}</p>
    <p class="delete"> <span id="${targetId.id}">delete</span></p>
    </div>
    `);
    handleDelete();
  });
};

let handleDelete = function () {
  $('.primary-container').on('click','span', event => {
    console.log('i heard you click delete');
    event.preventDefault();
    let id = event.currentTarget.id;
    console.log(id);
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
    // render the updated shopping list
    
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
  $('.primary-container').change( '.filter-options', ( event => {
    event.preventDefault(); 
    console.log('heard the change');
    // let minRating = e.currentTarget.value;
    // console.log(minRating);
    // let filteredItems = Store.filter(b => b.rating >= minRating);
    // renderBookmarkList(filteredItems);
  }));
};

/**
 * 
 * @param {element} item 
 */
let getIdFromElement = function (element) {
  return $(element)
    .closest('.bookmark-title')
    .data('id');
};

let serializeJson = function(form){
  let formData = new FormData(form);
  let o = {};
  formData.forEach((val,name) => o[name]= val);
  return JSON.stringify(o);
};







//------- | html / content creation and rendering | ----------------------------------
//Expects a single bookmark element
let generateBookmarkElement = function (bookmark) {
  if (bookmark.title){
    $('.primary-container').append(`
  <div class="js-bookmark" id="${bookmark.id}">
        <p class="expand">${bookmark.title} |  ${bookmark.rating}</p>
        <p class="delete"> <span id="${bookmark.id}"> - Delete - </span></p>
  </div>
  `);
  } else {
    $('.primary-container').append(`
    <li class="bookmark-element"> shouldn't happen
    <p class="bookmark-title">${bookmark.title}</p>
    <a href="${bookmark.url}">Visit Site</a>
    <p class="bookmark-rating">Rating - ${bookmark.rating}</p>
    <p>Description:${bookmark.description}</p>
    <p><span id="${bookmark.id}> - Delete - </span></p>
    </li>
  `);}
};

let renderBookmarkList = function(){
  $('.placeholder').html('');  
  let localBookmarks = Store.LOCALSTORE.bookmarks;
  for (let bm of localBookmarks){
    generateBookmarkElement(bm);
  }
};






let renderFormOrHeaders = function() {
  if (Store.adding){
    //console.log('ran true');
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
    $('.primary-container').html(
      `<section class="main-headers">
      <h3 class="new-bookmark-button"> + New Bookmark </h3>
      <h3 class ="minimum-rating"> Minimum Rating 
      <form class="js-filter-form">
        <select class="filter-options" value="1">
          <option value="1" selected="selected"> 1 </option>
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



// Needs tweaking for the rendering or checking of the filter of the list. 

// let renderFilteredList = function(){
//   console.log('this ran');
//   let StoreList = Store.STORE.Store;
//   for ( let i=0; i < StoreList.length; i++){
//     // for now i'm manually entering the filter rating. Need to get user input for this.
//     if(StoreList[i].rating >= Store.STORE.filter){
//       generateBookmarkElement(StoreList[i].title, StoreList[i].rating, StoreList[i].id);
//       console.log('renderFilteredList is running');
//       console.log(StoreList[i]);
//     } 
//   }
// };


//------- | binding the listeners | ----------------------------------

let callListeners = function(){
  handleSubmitButton();
  handleNewBookmarkButton();
  handleDelete();
  handleFilterChange();
};



//------- | Export Default Object | ----------------------------------
export default{
  handleNewBookmarkButton,
  createLocalStore,
  getIdFromElement,
  handleDelete,
  handleCancelButton,
  renderBookmarkList,
  generateBookmarkElement,
  callListeners,
  renderFormOrHeaders,
};