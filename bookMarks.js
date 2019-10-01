// This is the store of the bookmarks
import $ from 'jquery';
import api from './api';
// do i need to import CUID?
//import cuid from ''

const STORE = {
  bookmarks: [
    {
      id:'175wjc',
      title: 'Google',
      rating: 4,
      URL: 'https://www.google.com',
      expanded: false
    },
    {
      id:'6964',
      title: 'Yahoo',
      rating: 3,
      URL: 'https://www.yahoo.com',
      expanded: false
    },
    {
      id:'1jc',
      title: 'Bing',
      rating: 4,
      URL: 'https://www.bing.com',
      expanded: false
    }
  ],
  error: null,
  adding: false,
  filter: 1
};


export default{
  STORE
};