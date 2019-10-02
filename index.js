import handlers from './handlers.js';
import api from './api.js';
import store from './bookMarks.js';

// This the the whole of the shopping-list Index file. You probably don't need much more than this. 
const main = function () {
  
  api.getItems()
    .then((bookmarks) => {
      //console.log(bookmarks);
      handlers.renderBookmarkList;
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      handlers.renderBookmarkList(bookmarks); 
    });
  
  // bookmarks.bindEventListeners();
  // bookmarks.render();
};



$(main);