class Likes {
    baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

    appID = '8a0dfW0tu0UAP5mKoeUq';

    async fetchLikes() {
      try {
        const response = await fetch(`${this.baseURL}/${this.appID}/likes`);
        if (!response.ok) throw new Error('Error fetching likes');
        return response.json();
      } catch (err) {
        return false;
      }
    }

    async addLike(id) {
      try {
        const dataToSend = {
          item_id: id,
        };

        const response = await fetch(`${this.baseURL}/${this.appID}/likes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
        if (!response.ok) throw new Error('Error adding like');

        return true;
      } catch (err) {
        return false;
      }
    }
}

const likes = new Likes();
export default likes;