/* eslint-disable class-methods-use-this */
const showsContainer = document.getElementById('shows');

class ShowsView {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  generateMarkup(show) {
    return `<li class="show">
              <div class="show__img" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(${show.image.medium})">
                <h4>${show.name}</h4>
              </div>
              <div class="show__info">
                <ion-icon class="show__like" data-id="${show.id}" name="heart"></ion-icon>
                <span>5</span>
                <button type="button" data-id="${show.id}" class="show__comments">comments</button>
              </div>
            </li>`;
  }

  attachEventListeners() {
    document.querySelectorAll('.show__like').forEach((item) => {
      item.addEventListener('click', () => {
        // TODO: Implement liking a show
        console.log(`like the ${item.dataset.id}th element`);
      });
    });
    document.querySelectorAll('.show__comments').forEach((item) => {
      item.addEventListener('click', () => {
        // TODO: Implement opening comments section
        console.log(`open the ${item.dataset.id}'s modal`);
      });
    });
  }

  displayShows(shows) {
    this.parentElement.innerHTML = '';
    const showsSliced = shows.slice(0, 12);
    showsSliced.forEach((show) => {
      const markup = this.generateMarkup(show);
      this.parentElement.insertAdjacentHTML('beforeend', markup);
    });
    this.attachEventListeners();
  }
}

const showsView = new ShowsView(showsContainer);

export default showsView;