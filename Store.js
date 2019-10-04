// This is the store of the bookmarks
const LOCALSTORE = {
  bookmarks: [],
  error: null,
  adding: false,
  filter: 0
};


const addBookmark = function (bookmark) {
  LOCALSTORE.bookmarks.push(bookmark);
};

const findAndDeleteBookmark = function(id){
  // console.log(STORE.bookmarks);
  LOCALSTORE.bookmarks = LOCALSTORE.bookmarks.filter(currentItem => currentItem.id !== id);
};

const errorMessage = function (error){
  LOCALSTORE.error = error;
};


export default{
  LOCALSTORE,
  addBookmark,
  errorMessage,
  findAndDeleteBookmark,
};