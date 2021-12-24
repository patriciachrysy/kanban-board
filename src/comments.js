/* eslint-disable no-await-in-loop */

const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const appID = '8a0dfW0tu0UAP5mKoeUq';

export const fetchComments = async (showId) => {
  const response = await fetch(`${baseURL}/${appID}/comments?item_id=${showId}`);
  const data = response.ok ? await response.json() : [];
  return data;
};

const saveComment = async (showId, commentData) => {
  const data = {
    item_id: showId,
    username: commentData.name,
    comment: commentData.comment,
  };
  const response = await fetch(`${baseURL}/${appID}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.ok;
};

export const updateShowWithComments = async (shows) => {
  let i = 0;
  while (i < 24) {
    const showComments = await fetchComments(shows[i].id);
    shows[i].comments = showComments;
    i += 1;
  }
  return shows;
};

export const countComments = (show) => show.comments.length;

const displayComment = (comment) => {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');

  const commentHeaderDiv = document.createElement('div');
  commentHeaderDiv.classList.add('comment-header');
  const author = document.createElement('h4');
  author.innerText = comment.username;
  const timestamp = document.createElement('small');
  timestamp.innerText = comment.creation_date;
  commentHeaderDiv.appendChild(author);
  commentHeaderDiv.appendChild(timestamp);

  const commentContent = document.createElement('p');
  commentContent.innerText = comment.comment;

  commentDiv.appendChild(commentHeaderDiv);
  commentDiv.appendChild(commentContent);

  return commentDiv;
};

export const buildCommentSection = (show) => {
  const formSection = document.createElement('section');
  formSection.classList.add('comments');

  const title = document.createElement('h1');
  title.innerText = 'Comments';

  const spanCount = document.createElement('small');
  spanCount.setAttribute('id', `comment-count-${show.id}`);
  spanCount.innerText = `(${countComments(show)})`;

  title.appendChild(spanCount);

  formSection.appendChild(title);

  const form = document.createElement('form');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('id', 'name');
  nameInput.setAttribute('placeholder', 'Your name');

  const textarea = document.createElement('textarea');
  textarea.setAttribute('id', 'comment');
  textarea.setAttribute('name', 'comment');
  textarea.setAttribute('rows', '10');
  textarea.setAttribute('cols', '20');
  textarea.setAttribute('placeholder', 'Your comment');

  const div = document.createElement('div');
  div.classList.add('bottom');

  const submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Send Comment');
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (nameInput.value.trim().length > 0 && textarea.value.trim().length > 0) {
      const commentData = {
        name: nameInput.value,
        comment: textarea.value,
      };
      const res = await saveComment(show.id, commentData);
      if (res) {
        form.reset();
        const allComments = await fetchComments(show.id);
        const newComment = allComments[allComments.length - 1];
        form.parentNode.insertBefore(displayComment(newComment), form);
        show.comments = allComments;

        const showCommentCount = document.querySelector(`#comment-count-${show.id}`);
        showCommentCount.innerText = `(${countComments(show)})`;
      }
    }
  });

  const spoilButton = document.createElement('input');
  spoilButton.setAttribute('type', 'checkbox');
  spoilButton.setAttribute('name', 'spoiler');
  spoilButton.setAttribute('id', 'spoiler');
  spoilButton.setAttribute('value', 'spoiler');

  const label = document.createElement('label');
  label.setAttribute('for', 'spoiler');
  label.innerText = 'If you have a spoiler on your comment, click here';

  div.appendChild(submitButton);
  div.appendChild(spoilButton);
  div.appendChild(label);

  form.appendChild(nameInput);
  form.appendChild(textarea);
  form.appendChild(div);

  show.comments.map((comment) => {
    formSection.appendChild(displayComment(comment));
    return 0;
  });

  formSection.appendChild(form);

  return formSection;
};