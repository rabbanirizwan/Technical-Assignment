type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

export function filterSortPaginate(
  items: Item[],
  query: string,
  sortBy: "price" | "rating",
  dir: "asc" | "desc",
  page: number,
  pageSize: number
): { total: number; results: Item[] } {
 
  // make input all small 
  const userInput = query.trim().toLowerCase();

  // if user does not write anything return all list
  const filterElement = userInput
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(userInput) ||
          item.category.toLowerCase().includes(userInput)
      )
    : items;
    
    

  // 2. sort element
  const sorted = [...filterElement].sort((a, b) => {
   
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (valA === valB) return 0;
    return dir === "asc" ? valA - valB : valB - valA;
  });
  
  

  const total = sorted.length;
  const start = (page - 1) * pageSize;
  
  const results = sorted.slice(start, start + pageSize);
  

  return { total, results };
}

