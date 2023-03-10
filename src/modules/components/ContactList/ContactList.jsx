import { useDispatch, useSelector } from 'react-redux';
import { getFilteredContacts } from '../../../redux/contacts/contacts-selectors';
import { removeContact } from '../../../redux/contacts/contacts-slice';
import styles from './contact-list.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const contactList = filteredContacts.map(contact => {
    const handleRemoveContact = id => {
      dispatch(removeContact(id));
    };

    return (
      <li key={contact.id} className={styles.item}>
        <span>
          {contact.name}: {contact.number}
        </span>

        <button
          className={styles.btn}
          onClick={() => handleRemoveContact(contact.id)}
          type="button"
        >
          x
        </button>
      </li>
    );
  });

  return <ul className={styles.list}>{contactList}</ul>;
};

export default ContactList;
