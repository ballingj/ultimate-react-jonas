export function Item({ item, onDeleteItem, onToggleItem }) {
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
