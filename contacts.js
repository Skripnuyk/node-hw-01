const path = require("path");
const fs = require("fs").promises;
const { v4: uuid } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");

    return console.table(JSON.parse(contactsData));
  } catch (e) {
    console.log(e.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(contactsData);

    const stringedContactId = contactId.toString();

    const contactById = contactsList.find(
      (contact) => contact.id === stringedContactId
    );

    return contactById;
  } catch (e) {
    console.log(e.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(contactsData);

    const stringedContactId = contactId.toString();

    const indexRemovedContact = contactsList.findIndex(
      (contact) => contact.id === stringedContactId
    );

    if (indexRemovedContact === -1) {
      return null;
    }

    const [removedContact] = contactsList.splice(indexRemovedContact, 1);

    const stringedContactsList = JSON.stringify(contactsList);

    await fs.writeFile(contactsPath, stringedContactsList, "utf8");

    return removedContact;
  } catch (e) {
    console.log(e.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(contactsData);

    const newContact = { id: uuid(), name, email, phone };

    contactsList.push(newContact);

    const stringedContactsList = JSON.stringify(contactsList);

    await fs.writeFile(contactsPath, stringedContactsList, "utf8");

    return newContact;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };