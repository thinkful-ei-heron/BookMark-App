// https://github.com/thinkful-ei-heron/BookMark-App.git

//------- | Import statements | ----------------------------------
import Store from './Store.js';
import api from './api.js';


//------- | Listener Statements | ----------------------------------
//Need to review the best practice for the render statement.

let handleNewBookmarkButton = function(){
  $('.primary-container').on('click','.new-bookmark-button',function(event){
    event.preventDefault();
    //currently this is removing the code because the bookmark list is in main-headers
    $('.main-headers').remove();
    Store.adding = true;
    render();
    // handleCancelButton();
    // handleSubmitButton();
    // handleNewBookmarkButton();
  });
};

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
    <p class="delete" id="${targetId.id}"> <span>delete</span></p>
    </div>
    `);
    handleDelete();
  });
};

let handleDelete = function () {
  $('.placeholder').on('click',' .delete', event => {
    event.preventDefault();
    let id = event.currentTarget.id;
    console.log(id);
    api.deleteItem(id)
      .then(() => {
        Store.findAndDelete(id);
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
  $('main').submit(event => {
    console.log('submit was heard');
    event.preventDefault();
    let formElement = $('#form')[0];
    api.createItem(serializeJson(formElement))
      .then((newItem) => {
        Store.addBookmark(newItem);
        $('#form').remove();
        Store.adding = false;
        console.log(Store.LOCALSTORE);
      })
      .catch(error => {
        Store.error = true;
        alert(error.message);
      });
    
    
  });
};
//Possible code for filter.!!!!!!----------------
let handleFilterChange = function(){
  $('select').change( e => {
    console.log('heard the change');
    // let minRating = e.currentTarget.value;
    // console.log(minRating);
    // let filteredItems = Store.filter(b => b.rating >= minRating);
    // renderBookmarkList(filteredItems);
  });
};















//------- | html / content creation and rendering | ----------------------------------


/**
 * 
 * @param {element} item 
 */
let getIdFromElement = function (element) {
  return $(element)
    .closest('.bookmark-title')
    .data('id');
};

let generateBookmarkElement = function (title, rating,id) {
  if (title){
    $('.placeholder').append(`
  <div class="js-bookmark" id="${id}">
        <p class="expand">${title} |  ${rating}</p>
        <p class="delete" id="${id}"> <span>delete</span></p>
  </div>
  `);
  }
};



let render = function() {
  if (Store.adding){
    //console.log('ran true');
    $('.primary-container').html(`
    <section class="primary-container">
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
  </section>
    `);
  } else{
    $('.primary-container').html(
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
};

let serializeJson = function(form){
  let formData = new FormData(form);
  let o = {};
  formData.forEach((val,name) => o[name]= val);
  return JSON.stringify(o);
};

let renderBookmarkList = function(Store){
  $('.placeholder').html('');  
  console.log(Store.LOCALSTORE.bookmarks);
  for (let bm of Store.LOCALSTORE.bookmarks){
    generateBookmarkElement(
      bm.title, 
      bm.rating,
      bm.id
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
};
$(callListeners);



//------- | Export Default Object | ----------------------------------
export default{
  handleNewBookmarkButton,
  getIdFromElement,
  handleDelete,
  handleCancelButton,
  renderBookmarkList,
  generateBookmarkElement,
  callListeners,
  render,
};