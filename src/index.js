import './style.css';
import url from './images/logo.png';
import shows from './shows.js';
import showsView from './showsView.js';
import likes from './likes.js';
import countShowsView from './countShowsView.js';
import { updateShowWithComments } from './comments.js';

const displayShows = async () => {
  showsView.renderLoadingMessage();
  const allLikes = await likes.fetchLikes();
  let showsList = await shows.fetchShows();
  showsList = await updateShowWithComments(showsList);
  showsView.displayShows(showsList, allLikes);
};

const displayAmountOfShows = async () => {
  countShowsView.renderLoadingMessage();
  const allShows = await shows.fetchShows();
  const amountOfShows = shows.countShows(allShows);
  countShowsView.displayCount(amountOfShows);
};

window.onload = () => {
  displayShows();
  displayAmountOfShows();
  document.querySelector('.logo-img').src = url;
  document.querySelector('.footer-logo-img').src = url;
};