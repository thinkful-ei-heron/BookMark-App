import handlers from './handlers.js';
const main = function(){
  handlers();
};

// This the the whole of the shopping-list Index file. You probably don't need much more than this. 
//const main = function () {

//   api.getItems()
//     .then((items) => {
//       items.forEach((item) => store.addItem(item));
//       shoppingList.render();
//     });

//   shoppingList.bindEventListeners();
//   shoppingList.render();
// };




$(main);