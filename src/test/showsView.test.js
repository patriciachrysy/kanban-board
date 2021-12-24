import showsView from '../src/showsView.js';
import fetchShows from '../__mocks__/fetch.js';

describe('Check count number of shows overall', () => {
  test('check if the number of comment of any show to be fetched and updated', () => {
    const listOfShows = fetchShows();

    const showWithComments = showsView.updateShowWithComments(listOfShows);

    expect(numberOfShows[0].commentsCount).toBeDefined();
  });

  test('check if the value set a commentCount type is Number', () => {
    const listOfShows = fetchShows();

    const showWithComments = showsView.updateShowWithComments(listOfShows);

    expect(typeof numberOfShows[0].commentsCount).toBe('number');
  });
});