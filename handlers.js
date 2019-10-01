
import STORE from './bookMarks.js';

// function to handle listener for new book mark button
const handleNewBookmarkButton = function(){
  $('.new-bookmark-button').on('click',function(event){
    event.preventDefault();
    STORE.adding = true;
    console.log(STORE.adding);
    render();
    STORE.adding = false;
    console.log(STORE.adding);
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


const render = function(){
  if (STORE.adding){
    
    $('#js-bookMarks-list').html(`
    <form>
    <fieldset>
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
    `);
  }

};
console.log('handlers page loaded');
$(handleNewBookmarkButton);


export default{
  handleNewBookmarkButton,
  render,
  generateBookmarkElement
};