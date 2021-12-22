/* eslint-disable class-methods-use-this */
import { buildPopup } from './popup.js';

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
                  <span>5</span>
                  <ion-icon class="show__comment" data-id="${show.id}" name="chatbubble-outline"></ion-icon>
                </div>
              </div>
            </li>`;
  }

  attachEventListeners(shows) {
    document.querySelectorAll('.show__like').forEach((item) => {
      item.addEventListener('click', () => {
        // TODO: Implement liking a show
        console.log(`like the ${item.dataset.id}th element`);
      });
    });
    document.querySelectorAll('.show__comment').forEach((item) => {
      item.addEventListener('click', () => {
        // TODO: Implement opening comments section
        console.log(`open the ${item.dataset.id}'s modal`);
        let theShow = null;
        shows.map((show) => {
          if(show.id === parseInt(item.dataset.id)) {
            theShow = show;
          }
        });
        console.log("Show was found");
        console.log(theShow);
        const popSection = document.querySelector('.popup-section');
        let popup = buildPopup(theShow);
        popup.classList.add('show');
        popSection.innerHTML = '';
        popSection.appendChild(popup);

        let popupCloseButton = document.querySelector('#close');
        popupCloseButton.addEventListener('click', () => {
          popup.classList.add('hide');
        })
      });
    });
  }

  displayShows(shows) {
    this.parentElement.innerHTML = '';
    const showsSliced = shows.slice(0, 24);
    showsSliced.forEach((show) => {
      const markup = this.generateMarkup(show);
      this.parentElement.insertAdjacentHTML('beforeend', markup);
    });
    this.attachEventListeners(shows);
  }
}

const showsView = new ShowsView(showsContainer);

export default showsView;