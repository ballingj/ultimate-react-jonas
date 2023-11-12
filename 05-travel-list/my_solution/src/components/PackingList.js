import { useState } from 'react';
import { Item } from './Item';

export function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearItems,
}) {
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
