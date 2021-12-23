const countShowsContainer = document.getElementById('count-shows');

class CountShowsView {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  renderLoadingMessage() {
    this.parentElement.innerText = 'Loading...';
  }

  displayCount(amountOfShowsOverall) {
    this.parentElement.innerText = `24 displayed out of ${amountOfShowsOverall} shows overall`;
  }
}

const countShowsView = new CountShowsView(countShowsContainer);
export default countShowsView;