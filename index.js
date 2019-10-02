import handlers from './handlers.js';
import api from './api.js';
import bookMarks from './Store.js';

// This the the whole of the shopping-list Index file. You probably don't need much more than this. 
const main = function () {
  
  api.getItems()
    .then((bookmarks) => {
      //console.log(bookmarks);
      //handlers.renderBookmarkList;
      bookmarks.forEach((bookmark) => bookMarks.addBookmark(bookmark));
      console.log(bookMarks); 
      handlers.renderBookmarkList(bookMarks.bookmarks); 
    });
  
  // bookmarks.bindEventListeners();
  // bookmarks.render();
};


$(main);