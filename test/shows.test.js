import shows from '../src/shows.js';
import fetchShows from '../__mocks__/fetch.js';

describe('Check count number of shows overall', () => {
  test('check if returns a correct number', () => {
    const listOfShows = fetchShows();

    const numberOfShows = shows.countShows(listOfShows);

    expect(numberOfShows).toBe(200);
  });

  test('check if the return value type is Number', () => {
    const listOfShows = fetchShows();

    const numberOfShows = shows.countShows(listOfShows);

    expect(typeof numberOfShows).toBe('number');
  });
});