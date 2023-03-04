const  { v4 } =  require('uuid') 

const path = require('path');
const fs = require('fs').promises

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    
    return contacts
  } catch (error) {
    console.log(error)
  }
}
  
  
async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(el => el.id === contactId)
    
    return contact
  } catch (error) {
    console.log(error)
  }
}
  
async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.filter(el => el.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(contact))
    return contact;
  } catch (error) {
    console.log(error)
  }
}
  
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts()
    const newContact = {name, email, phone, id: v4()}
    contacts.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact;
  } catch (error) {
    console.log(error)
  }
}


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }