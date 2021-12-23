/* eslint-disable no-underscore-dangle */
import { buildCommentSection } from './comments.js';

const collectGenres = (genres) => {
  let genreTags = '';
  genres.map((genre) => {
    genreTags += `<span>${genre}</span>`;
    return 0;
  });
  return genreTags;
};

const collectDaySchedule = (days) => {
  let daysList = '';
  days.map((day) => {
    daysList += (`${day}, `);
    return 0;
  });
  return daysList;
};

export default (show) => {
  const popup = document.createElement('div');
  popup.classList.add('popup');

  popup.innerHTML = `
        <button id="close"><i class="fa fa-close"></i></button>
        <section class="details">
            <div class="infos">
                <h1 id="title">${show.name}</h1>
                <div class="genres">
                    ${collectGenres(show.genres)}
                </div>
                <div class="schedule">
                <span>${collectDaySchedule(show.schedule.days)} | ${show.schedule.time}</span>
                </div>
                <div class="description">
                    ${show.summary}
                </div>
                <div class="actions">
                <a href="${show._links.self.href}"> <i class="fa fa-play"></i>Watch now </a>
                <a href="${show._links.previousepisode.href}"> <i class="fa fa-plus"></i>Previous episode </a>
                </div>
            </div>
            <div class="picture">
                <img src="${show.image.medium}" alt="${show.name}">
            </div>
        </section>
    `;
  popup.appendChild(buildCommentSection(show));

  return popup;
};