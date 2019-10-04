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



/**
 * 
 * @param {id} id  Takes the ID of an individual and runs DELETE to the server
 */
const deleteItem = function(id){
  return apiFetch(
    `${BASE_URL}bookmarks/${id}`,{
      method: 'DELETE',
    }
  );
};


// The name import is a Json string object.
const createItemOnServer = function(name){
  return apiFetch(`${BASE_URL}bookmarks`,{
    method:'POST',
    headers: { 'Content-Type': 'application/json'},
    body: name
  });
};

export default {
  apiFetch,
  getItems,
  deleteItem,
  createItemOnServer
};
