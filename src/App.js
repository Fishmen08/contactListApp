import React, { useEffect, useState } from 'react';
import {API} from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';



function App({signOut}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    API.get('contactlistapi', './contacts/name')
    .then(contactsResponse => console.log(contactsResponse))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('contactlistapi', '/contacts', {
      body: {
        name: name,
        phone: phone
      }
    })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        Hello
        <form onSubmit={handleSubmit}>
          <input value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
          <input value={phone} placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} />
          <button type='submit'>Add Contact</button>
        </form>
        <button onClick={signOut}>Sign Out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
