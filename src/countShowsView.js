const countShowsContainer = document.getElementById('count-shows');

class CountShowsView {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  displayCount(amountOfShows) {
    this.parentElement.innerText = `${amountOfShows} shows overall`;
  }
}

const countShowsView = new CountShowsView(countShowsContainer);
export default countShowsView;