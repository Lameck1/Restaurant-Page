import createElem from './createElem';

export default () => {
  // renders contact section
  const content = document.getElementById('content');

  const contactSection = createElem('section', { class: 'contact-section' });
  const detailsDiv = createElem('div', { class: 'contact-div' });
  const detailsDivHeader = createElem('h2', {}, 'Call Us');
  const phoneNo = createElem('p', {}, '+254-7-11-234-567');
  detailsDiv.append(detailsDivHeader, phoneNo);

  const formDiv = createElem('div', { class: 'form-div' });
  const formDivHeader = createElem('h2', {}, 'Leave Us a Message');
  const form = createElem('form', {});
  const emailField = createElem('input', { type: 'email', placeholder: 'Your email here' });
  const messageField = createElem('textarea', {
    name: 'message', rows: '10', cols: '30', placeholder: 'Your message here',
  });
  const submitButton = createElem('input', { type: 'button', value: 'Send Message' });
  form.append(emailField, messageField, submitButton);
  formDiv.append(formDivHeader, form);

  contactSection.append(detailsDiv, formDiv);
  content.appendChild(contactSection);
};
