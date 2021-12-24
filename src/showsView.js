/* eslint-disable class-methods-use-this */
import buildPopup from './popup.js';
import likes from './likes.js';

const showsContainer = document.getElementById('shows');

class ShowsView {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  generateMarkup(show) {
    return `<li class="show" data-id="${show.id}">
              <div class="show__img" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(${show.image.medium})">
                <h4>${show.name}</h4>
                <div class="show__info">
                  <ion-icon class="show__like" data-id="${show.id}" name="heart"></ion-icon>
                  <span class="show__like-amount">${show.likes}</span>
                  <ion-icon class="show__comment" data-id="${show.id}" name="chatbubble-outline"></ion-icon>
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

  updateLikedItem(id, newAmountOfLikes) {
    const showsElements = [...this.parentElement.children];
    const showToUpdate = showsElements.find((element) => element.dataset.id === `${id}`);
    showToUpdate.querySelector('.show__like-amount').innerText = newAmountOfLikes;
  }

  attachEventListeners(shows) {
    document.querySelectorAll('.show__like').forEach((item) => {
      item.addEventListener('click', async () => {
        try {
          const { id } = item.dataset;
          const responseAddLike = await likes.addLike(+id);
          if (!responseAddLike) throw new Error('Failed to add like');

          const allLikes = await likes.fetchLikes();
          if (!allLikes) throw new Error('Failed to get all likes');
          const amountOfLikes = allLikes.find((like) => like.item_id === +id).likes;
          this.updateLikedItem(id, amountOfLikes);

          return true;
        } catch (err) {
          return false;
        }
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