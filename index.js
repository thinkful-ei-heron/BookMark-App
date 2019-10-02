import handlers from './handlers.js';
import api from './api.js';
import store from './bookMarks.js';

// This the the whole of the shopping-list Index file. You probably don't need much more than this. 
const main = function () {
  handlers.renderBookmarkList;
  // api.getItems()
  //   .then((bookmarks) => {
  //     console.log(bookmarks)
  //     // bookmarks.forEach((bookmark) => store.addItem(bookmark));
  //     // bookmarks.render();
  //   });

  // bookmarks.bindEventListeners();
  // bookmarks.render();
};



$(main);