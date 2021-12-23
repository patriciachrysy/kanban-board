import './style.css';
import url from './images/logo.png';
import shows from './shows.js';
import showsView from './showsView.js';

const displayShows = async () => {
  let showsList = await shows.getShows();
  showsList = await showsView.updateShowWithComments(showsList);
  showsView.displayShows(showsList);
};

window.onload = () => {
  displayShows();
  document.querySelector('.logo-img').src = url;
  document.querySelector('.footer-logo-img').src = url;
};