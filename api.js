// all fetch and api interaction functions will be created here.

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/wesley/';

//This should be simply making an API call with error handling. returning a promise.
const apiFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if(!res.ok){
        error = {code:res.status};
      }
      return res.json();
    })
    .then(data => {
      if(error){
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};



//This should be able to return the values in our API store
const getItems = function(){
  return apiFetch(`${BASE_URL}bookmarks`);
};

const addNewBookmarkAPI = function(id, updateData) {
  const newObject = {
    'title': updateData.name,
    'url': updateData.checked,
    'rating': updateData.rating,
    'expanded': false,
    'desc': updateData.description
  };
  return apiFetch(
    `${BASE_URL}bookmarks/${id}`,{
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObject)
    });
  //    .catch(err => console.log(err.message)));
};

//
const deleteItem = function(id){

  return apiFetch(
    `${BASE_URL}bookmarks/${id}`,{
      method: 'DELETE',
    }
  );
};



const createItem = function(name){
  console.log(name);
  let newItem = JSON.stringify({name});
  //console.log(typeof newItem);
  return apiFetch(`${BASE_URL}bookmarks`,{
    method:'POST',
    headers: { 'Content-Type': 'application/json'},
    body: name
  });
};

export default {
  apiFetch,
  addNewBookmarkAPI,
  getItems,
  deleteItem,
  createItem
};
