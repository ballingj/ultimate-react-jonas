/* This is the code at the end of lesson 84: calc stats with derived state.  I'm preserving this code at this point because this code deals with parent to child back to parent communications of components */

import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Shirts', quantity: 5, packed: false },
  { id: 4, description: 'Shorts', quantity: 5, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

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

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
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
