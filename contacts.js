const  { v4 } =  require('uuid') 


const path = require('path');
const fs = require('fs').promises





 const contactsPath = path.join('db', 'contacts.json');
//  console.log(contactsPath, 'erererer')


// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    
    return contacts
  }
  
  
async function getContactById(contactId) {
    const contacts = await listContacts()
    const contact = contacts.find(el => el.id === contactId)
    
    return contact
  }
  
async function removeContact(contactId) {
    const contacts = await listContacts()
    const contact = contacts.filter(el => el.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(contact))
    return contact;
  }
  
async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContact = {name, email, phone, id: v4()}
    contacts.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact;
  }


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }