export function Stats({ items }) {
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
