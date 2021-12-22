export const buildCommentForm = () => {

    let formSection = document.createElement('section');
    formSection.classList.add('comments');

    let title = document.createElement('h1');
    title.innerText = 'Comments';

    formSection.appendChild(title);

    let form = document.createElement('form');

    let nameInput = document.createElement('input');
    nameInput.setAttribute('type', "text");
    nameInput.setAttribute('name', "name");
    nameInput.setAttribute('id', "name");
    nameInput.setAttribute('placeholder', "Your name");

    let textarea = document.createElement('textarea');
    textarea.setAttribute('id', "comment");
    textarea.setAttribute('name', "comment");
    textarea.setAttribute('rows', "10");
    textarea.setAttribute('cols', "20");
    textarea.setAttribute('placeholder', "Your comment");


    let div = document.createElement('div');
    div.classList.add('bottom');

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', "submit");
    submitButton.setAttribute('value', "Send Comment");
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Implement comment saving
    })

    let spoilButton = document.createElement('input');
    spoilButton.setAttribute('type', "checkbox");
    spoilButton.setAttribute('name', "spoiler");
    spoilButton.setAttribute('id', "spoiler");
    spoilButton.setAttribute('value', "spoiler");
    
    let label = document.createElement('label');
    label.setAttribute('for', "spoiler");
    label.innerText = "If you have a spoiler on your comment, click here";

    div.appendChild(submitButton);
    div.appendChild(spoilButton);
    div.appendChild(label);

    form.appendChild(nameInput);
    form.appendChild(textarea);
    form.appendChild(div);

    formSection.appendChild(form);

    return formSection;
}