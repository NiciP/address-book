const renderContacts = () => {
  const storage = window.localStorage;
  const contacts = JSON.parse(storage.getItem("contacts"));
  let div = document.querySelector(".contact-list");

  if (contacts) {
    div.innerHTML = "";
    const ul = document.createElement("ul");
    contacts.forEach(contact => {
      let li = document.createElement("li");
      li.setAttribute("class", "list-reset");
      li.innerHTML = `
      <div class="card mb-4" >
      </div>
      <div class="content list-reset">
      <br>
      <h3>${contact.name}</h3>
      <h5>${contact.company}</h5>
      <p>${contact.notes}</p> 
      ${contact.email} <br> 
      <a href="https://www.twitter.com/${contact.twitter}">@${
        contact.twitter
      }</a>
      </div>
      </div><br>
           `;
      ul.appendChild(li);
    });

    div.appendChild(ul);
  } else {
    div.innerHTML = "<p>You have no contacts in your address book</p>";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderContacts();

  const addContactForm = document.querySelector(".new-contact-form");

  addContactForm.addEventListener("submit", event => {
    event.preventDefault();
    const storage = window.localStorage;

    const {
      name,
      email,
      phone,
      company,
      notes,
      twitter
    } = addContactForm.elements;

    const contact = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      notes: notes.value,
      twitter: twitter.value
    };

    let contacts = JSON.parse(storage.getItem("contacts")) || [];
    contacts.push(contact);
    storage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
    addContactForm.reset();
  });
});