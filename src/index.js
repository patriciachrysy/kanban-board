import './style.css';
import url from './images/logo.png';
import shows from './shows.js';
import showsView from './showsView.js';

const displayShows = async () => {
  const showsList = await shows.getShows();
  showsView.displayShows(showsList);
};

window.onload = () => {
  document.querySelector('.logo-img').src = url;
  displayShows();
};