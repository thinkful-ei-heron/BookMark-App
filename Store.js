import api from "./api.js";

// This is the store of the bookmarks
const STORE = {
  bookmarks: [
    {}
  ],
  error: null,
  adding: false,
  filter: 1
};


const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addBookmark = function (bookmark) {
  STORE.bookmarks.push(bookmark);
};




export default{
  findById,
  addBookmark,
  STORE
};