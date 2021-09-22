const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const requiredContact = contacts.find((contact) => contact.id === contactId);
  console.table(requiredContact || "no such file found");
  return requiredContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log("contact removed");
    return newContacts;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newID = contacts[contacts.length - 1].id + 1;

  contacts.push({
    id: newID,
    name,
    email,
    phone,
  });

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("operation succeed");
    console.table({
      id: newID,
      name,
      email,
      phone,
    });
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};