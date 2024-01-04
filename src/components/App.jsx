import { Component } from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FcBusinessContact, FcContacts } from 'react-icons/fc';


export class App extends Component {

state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  name: '',
  number: '',
}

addNewContact = (newContact) => {
  const { contacts } = this.state;
  const nameExists = contacts.some(
    (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
  );
  if (nameExists) {
    Notify.warning(`${newContact.name}' is already in contacts.`);
  } else {
    this.setState((prevState) => ({
    contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
  }));
}
};

filter = (searchName)=> {
  this.setState(() => ({
    filter: searchName,
  }));
}

  onRemoveContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId)
    }));
  }

  render() {
    const {contacts, filter } = this.state;
    const visibleContacts = filter ? contacts.filter((contact) => 
      contact.name.toLowerCase().includes(filter.toLowerCase())
    ) : contacts;

    return <>
  <h1 className="mb-4 flex items-center justify-center gap-2 text-2xl"><FcBusinessContact/>Phonebook</h1>
  <ContactForm onAddContact={this.addNewContact}/>
  <h2 className="mb-4 flex items-center justify-center gap-2 text-xl"><FcContacts/>Contacts</h2>
  <Filter onSearch={this.filter} filterValue ={filter}/>
  <ContactList contacts={visibleContacts} onRemoveContact={this.onRemoveContact} />
  </>
  }
}