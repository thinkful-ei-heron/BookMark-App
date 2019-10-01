
import STORE from './bookMarks.js';

// function to handle listener for new book mark button
const handleNewBookmarkButton = function(){
  $('.new-bookmark-button').on('click',function(event){
    event.preventDefault();
    $('.filter-options').addClass('hidden');
    $('.js-bookMarks-list').addClass('hidden');
    $('.new-bookmark-button').addClass('hidden');
    STORE.adding = true;
    console.log(typeof STORE.adding);
    renderNewBookmarkForm();
    console.log(typeof STORE.adding);
  });
};

const handleCancelButton = function(){
  $('.fieldset').on('click',function(event){
    console.log('i heard that');
    event.preventDefault();
    console.log('i heard that');
    STORE.adding = false;
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
const generateBookmarkElement = function (item) {
  let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="shopping-item" type="text" value="${item.name}" />
      </form>
    `;
  }

  return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${itemTitle}
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};

// function that renders the list
// function that renders the add
const renderNewBookmarkForm = function() {
  if (STORE.adding){
    $('.minimum-rating').html(`
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

const renderBookmarkList = function(){
  $('#js-bookMarks-list').html(`
  <div>
  <ul>
    <li>Title</li>
    <li>Rating</li>
    <li>Delete</li>
  </ul>
</div>
<div>
  <p>First bookmark |  5 | <span>X</span></p>
  <p>Second bookmark |  5 | <span>X</span></p>
  <p>Third bookmark |  5 | <span>X</span></p>
  <p>Fourth bookmark |  5 | <span>X</span></p>
  <p>Fifth bookmark |  5 | <span>X</span></p>
</div>
</section>`);
  
};

console.log('handlers page loaded');

const callListeners = function(){
  renderBookmarkList(); 
  handleNewBookmarkButton();
  handleCancelButton();
};



$(callListeners);

export default{
  handleNewBookmarkButton,
  handleCancelButton,
  renderBookmarkList,
  renderNewBookmarkForm,
  generateBookmarkElement
};