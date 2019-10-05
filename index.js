import handlers from './handlers.js';


// This the the whole of the shopping-list Index file. You probably don't need much more than this. 
const main = function () {
  
  //handlers.bindEventListeners();
  handlers.callListeners();
  handlers.createLocalStore();
  handlers.renderFormOrHeaders();
  handlers.renderBookmarkList();
};


$(main);