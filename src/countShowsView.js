const countShowsContainer = document.getElementById('count-shows');

class CountShowsView {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  renderLoadingMessage() {
    this.parentElement.innerText = 'Loading...';
  }

  displayCount(amountOfShows) {
    this.parentElement.innerText = `${amountOfShows} shows overall`;
  }
}

const countShowsView = new CountShowsView(countShowsContainer);
export default countShowsView;