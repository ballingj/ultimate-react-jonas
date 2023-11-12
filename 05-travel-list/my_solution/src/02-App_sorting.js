/* This is the code at the end of lesson 86 - sorted items and 87 Clearing the List items.  PackingList Component was modified to allow for this functionality */

import { useState } from 'react';

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
    const confirmed = window.confirm('Are you sure you want to delete all items?')
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

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* Sequence generator:  see doc for Array.from here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from */}
        {Array.from({ length: 20 }, (v, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/*<input
        type='number'
        min={1}
        max={20}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value*1)}
      />*/}
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
  /* When sorting strings using localeCompare(), the method considers various factors such as language-specific rules, character sets, and cultural conventions. It compares the string character by character and returns:
• a negative value if the first string should be sorted before the second.
• a positive value if the first string should be sorted after the second.
• 0 if the strings are considered equal in terms of sort order.

The return values are in congruence with the sort() method's sort order.

sort() uses the return value of localeCompare to rearrange the strings in ascending (alphabetical) order. As a result, the array of strings is sorted according to the current locale settings.

    const words = ['apple', 'äpple', 'banana', 'orange'];
     
    words.sort((a, b) => a.localeCompare(b));
    console.log(words); // Output: ['apple', 'äpple', 'banana', 'orange'] */

  // have to use the .slice() method to not mutate the original array
  // i.e.  sortedItems = items.slice().sort()

  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            item={item}
            key={item.id}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* we are callingback {() => onDeleteItems(item.id)} to pass item.id  */}
      <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className='stats'>
        <em>Start adding some items to your packing list</em>
      </p>
    );
  const numItems = items.length;
  const alreadyPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((alreadyPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage !== 100
          ? `You have ${numItems} items on your list, and you already packed ${alreadyPacked} ${percentage}`
          : numItems === 1
          ? `You packed ${numItems} item. ✈️ Ready to go! ✈️`
          : `You packed ${numItems} items. ✈️ Ready to go! ✈️`}
      </em>
    </footer>
  );
}

export default App;
