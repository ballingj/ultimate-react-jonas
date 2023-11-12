/* This is the code at the end of lesson 86 - sorted items and 87 Clearing the List items.  PackingList Component was modified to allow for this functionality */

import { useState } from 'react';
import { Logo } from './Logo';
import { Form } from './Form';
import { PackingList } from './PackingList';
import { Stats } from './Stats';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Shirts', quantity: 5, packed: false },
  { id: 4, description: 'Shorts', quantity: 5, packed: false },
];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    // deconstruct current items array and add new item
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    // fiter returns a new array where matching id is not included
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    );
    if (confirmed) {
      setItems([]);
    }
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
