/* eslint-disable class-methods-use-this */
/* eslint-disable no-await-in-loop */
import buildPopup from './popup.js';
import { fetchComments } from './comments.js';

const showsContainer = document.getElementById('shows');

class ShowsView {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  generateMarkup(show) {
    return `<li class="show">
              <div class="show__img" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(${show.image.medium})">
                <h4>${show.name}</h4>
                <div class="show__info">
                  <ion-icon class="show__like" data-id="${show.id}" name="heart"></ion-icon>
                  <span class="show__like-amount">${show.likes}</span>
                  <ion-icon class="show__comment" data-id="${show.id}" name="chatbubble-outline"></ion-icon>
                  <span>${show.commentsCount}</span>
                </div>
              </div>
            </li>`;
  }

  renderLoadingMessage() {
    this.parentElement.innerHTML = '<li class="show">Loading...</li>';
  }

  clearParentElement() {
    this.parentElement.innerHTML = '';
  }

  attachEventListeners(shows) {
    document.querySelectorAll('.show__like').forEach((item) => {
      item.addEventListener('click', () => {
      });
    });
    document.querySelectorAll('.show__comment').forEach((item) => {
      item.addEventListener('click', () => {
        let theShow = null;
        shows.map((show) => {
          if (show.id === parseInt(item.dataset.id, 10)) {
            theShow = show;
          }
          return 0;
        });
        const popSection = document.querySelector('.popup-section');
        const popup = buildPopup(theShow);
        popup.classList.add('show');
        popSection.innerHTML = '';
        popSection.appendChild(popup);

        const popupCloseButton = document.querySelector('#close');
        popupCloseButton.addEventListener('click', () => {
          popup.classList.add('hide');
        });
      });
    });
  }

  async updateShowWithComments(shows) {
    let i = 0;
    while (i < 24) {
      const showComments = await fetchComments(shows[i].id);
      shows[i].commentsCount = showComments.length;
      shows[i].comments = showComments;
      i += 1;
    }
    return shows;
  }

  displayShows(shows, allLikes) {
    this.parentElement.innerHTML = '';
    const showsSliced = shows.slice(0, 24);
    showsSliced.forEach((show) => {
      const amountOfLikes = allLikes.find((like) => like.item_id === show.id);
      show.likes = amountOfLikes?.likes || 0;
      const markup = this.generateMarkup(show);
      this.parentElement.insertAdjacentHTML('beforeend', markup);
    });
    this.attachEventListeners(shows);
  }
}

const showsView = new ShowsView(showsContainer);

export default showsView;