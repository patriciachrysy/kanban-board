import './style.css';
import url from './images/logo.png';
import shows from './shows.js';
import showsView from './showsView.js';
import likes from './likes.js';
import countShowsView from './countShowsView.js';

const displayShows = async () => {
  showsView.renderLoadingMessage();
  const allLikes = await likes.fetchLikes();
  const showsList = await shows.fetchShows();
  showsView.displayShows(showsList, allLikes);
};

const displayAmountOfShows = async () => {
  countShowsView.renderLoadingMessage();
  const amountOfShows = await shows.countShows();
  countShowsView.displayCount(amountOfShows);
}

window.onload = () => {
  displayShows();
  displayAmountOfShows();
  document.querySelector('.logo-img').src = url;
  document.querySelector('.footer-logo-img').src = url;
};