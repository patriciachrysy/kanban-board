import './style.css';
import url from './images/logo.png';
import shows from './shows.js';
import showsView from './showsView.js';
import likes from './likes.js';

const displayShows = async () => {
  showsView.renderLoadingMessage();
  const allLikes = await likes.fetchLikes();
  let showsList = await shows.fetchShows();
  showsList = await showsView.updateShowWithComments(showsList);
  showsView.displayShows(showsList, allLikes);
};

window.onload = () => {
  displayShows();
  document.querySelector('.logo-img').src = url;
  document.querySelector('.footer-logo-img').src = url;
};