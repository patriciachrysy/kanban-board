/* eslint-disable class-methods-use-this */
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

  countShows(data) {
    return data.length;
  }
}

const shows = new Shows();

export default shows;