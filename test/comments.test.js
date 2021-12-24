import { countComments } from '../src/comments.js';
import fetchSowWithComments from '../__mocks__/fetchSowWithComments.js';

describe('Check count number of shows overall', () => {
  test('check if the number of comment of any show to be fetched and updated', () => {
    const shows = fetchSowWithComments();

    const commentsCount = countComments(shows[0]);

    expect(commentsCount).toBeDefined();
  });

  test('check if the value set a commentCount type is Number', () => {
    const shows = fetchSowWithComments();

    const commentsCount = countComments(shows[0]);

    expect(typeof commentsCount).toBe('number');
  });
});