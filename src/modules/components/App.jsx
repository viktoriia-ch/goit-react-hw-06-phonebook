import { Notify } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';

import {
  addContacts,
  removeContact,
} from '../../redux/contacts/contacts-slice';
import { setFilter } from '../../redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from '../../redux/contacts/contacts-selectors';
import { getFilter } from '../../redux/filter/filter-selectors';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import styles from './app.module.css';

const App = () => {
  const contacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return Notify.warning(`Contact '${name}: ${number}' is already exist`);
    }
    dispatch(addContacts({ name, number }));
  };

  const handleRemoveContact = id => {
    dispatch(removeContact(id));
  };

  const handleFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    return contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter handleChange={handleFilter} value={filter} />
      <ContactList
        contacts={filteredContacts}
        removeContact={handleRemoveContact}
      />
    </div>
  );
};

export default App;
