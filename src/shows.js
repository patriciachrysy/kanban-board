class Shows {
  baseURL = 'https://api.tvmaze.com/shows';

  async fetchShows() {
    try {
      const response = await fetch(this.baseURL);
      if (response.status !== 200) throw new Error('Error fetching movies');
      return response.json();
    } catch (err) {
      return false;
    }
  }

  async getShows() {
    try {
      const moviesList = await this.fetchShows();
      if (!moviesList) throw new Error('Error fetching movies');
      return moviesList;
    } catch (err) {
      return false;
    }
  }
}

const shows = new Shows();

export default shows;