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

  async countShows() {
    try {
      const showsList = await this.fetchShows();
      if (!showsList) throw new Error('failed to fetch shows list');

      return showsList.length;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

const shows = new Shows();

export default shows;