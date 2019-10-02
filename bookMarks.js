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


// const apiList = function(){
//   for( let i=0; i <api.getItems.length; i++){
//     console.log(api.getItems[i]);
//     //STORE.api.getItems;
//   }
// };
// apiList();


const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addBookmark = function (bookmark) {
  STORE.bookmarks.push(bookmark);
};



export default{
  STORE,
  findById,
  addBookmark
};