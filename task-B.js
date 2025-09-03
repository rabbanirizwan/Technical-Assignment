function List({ items, onBuy }) {
  const [q, setQ] = React.useState("");

  // add callback function so same instance of function shared with every item and it will prevent unnecessary re-render of child component
  const handleBuy = React.useCallback(
    (item) => onBuy(item),
    [onBuy]
  );

  // Filter items using memo so if items or search does not change, it will not re calculate result and return cache result,which avoid unnecessary re-render
  const filteredItems = React.useMemo(
    () =>
      items.filter(value =>
        value.name.toLowerCase().includes(q.trim().toLowerCase())
      ),
    [items, q]
  );

  return (
    <>
      <button type="button" className="btn" onClick={() => onBuy()} aria-label='Buy Selected Item'>
        Buy
      </button>
      <label htmlFor='search-input'> Search Items</label>
      <input
        type="text"
        placeholder="Search"
        value={q}
        onChange={e => setQ(e.target.value)}
        aria-label="Search items"
      />
      
      <div aria-live='polite'>
           {filteredItems.map(item => (
        <Row
          key={item.id}
          item={item}
          onClick={() => handleBuy(item)}
        />
      ))}
      </div>
     
    </>
  );
}
