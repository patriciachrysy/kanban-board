const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const appID = '8a0dfW0tu0UAP5mKoeUq';

export const fetchComments = async (showId) => {
  const response = await fetch(`${baseURL}/${appID}/comments?item_id=${showId}`);
  const data = response.ok ? await response.json() : [];
  return data;
};

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

export const buildCommentSection = (comments) => {
  const formSection = document.createElement('section');
  formSection.classList.add('comments');

  const title = document.createElement('h1');
  title.innerText = 'Comments';

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
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Implement comment saving
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

  formSection.appendChild(form);

  comments.map((comment) => {
    formSection.appendChild(displayComment(comment));
    return 0;
  });

  return formSection;
};