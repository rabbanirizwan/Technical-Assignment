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
    
    

   // sort element
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

// sample items
const items = [
  { id: 1, name: 'Smartphone', category: 'Electronics', price: 999.00, rating: 4.7 },
  { id: 2, name: 'Laptop', category: 'Electronics', price: 1999.00, rating: 4.8 },
  { id: 3, name: 'Wireless Headphones', category: 'Electronics', price: 299.00, rating: 4.5 },
  { id: 4, name: 'Smartwatch', category: 'Electronics', price: 499.00, rating: 4.6 },
  { id: 5, name: 'Gaming Console', category: 'Gaming', price: 499.00, rating: 4.8 },
  { id: 6, name: 'Video Game', category: 'Gaming', price: 59.99, rating: 4.5 },
  { id: 7, name: 'Gaming Mouse', category: 'Gaming', price: 79.99, rating: 4.6 },
  { id: 8, name: 'T-Shirt', category: 'Clothing', price: 25.00, rating: 4.3 },
  { id: 9, name: 'Jeans', category: 'Clothing', price: 50.00, rating: 4.4 },
  { id: 10, name: 'Sneakers', category: 'Clothing', price: 120.00, rating: 4.6 },
];

// Test cases with expected outputs
console.log('All items:');
console.log(filterSortPaginate(electronicClothingGamingItems, '', 'price', 'asc', 1, 10));

console.log('Filter by name "Smartphone":');
console.log(filterSortPaginate(electronicClothingGamingItems, 'Smartphone', 'price', 'asc', 1, 10));

console.log('Filter by category "Gaming":');
console.log(filterSortPaginate(electronicClothingGamingItems, 'Gaming', 'price', 'asc', 1, 10));

// 1.All items:

// {
//   "total": 10,
//   "results": [
//     { "id": 8, "name": "T-Shirt", "category": "Clothing", "price": 25.00, "rating": 4.3 },
//     { "id": 9, "name": "Jeans", "category": "Clothing", "price": 50.00, "rating": 4.4 },
//     { "id": 3, "name": "Wireless Headphones", "category": "Electronics", "price": 299.00, "rating": 4.5 },
//     { "id": 4, "name": "Smartwatch", "category": "Electronics", "price": 499.00, "rating": 4.6 },
//     { "id": 5, "name": "Gaming Console", "category": "Gaming", "price": 499.00, "rating": 4.8 },
//     { "id": 10, "name": "Sneakers", "category": "Clothing", "price": 120.00, "rating": 4.6 },
//     { "id": 1, "name": "Smartphone", "category": "Electronics", "price": 999.00, "rating": 4.7 },
//     { "id": 2, "name": "Laptop", "category": "Electronics", "price": 1999.00, "rating": 4.8 },
//     { "id": 6, "name": "Video Game", "category": "Gaming", "price": 59.99, "rating": 4.5 },
//     { "id": 7, "name": "Gaming Mouse", "category": "Gaming", "price": 79.99, "rating": 4.6 }
//   ]
// }

// 2.Filter by name "Smartphone":
// {
//   "total": 1,
//   "results": [
//     { "id": 1, "name": "Smartphone", "category": "Electronics", "price": 999.00, "rating": 4.7 }
//   ]
// }


// 3.Filter by category "Gaming":

// {
//   "total": 3,
//   "results": [
//     { "id": 5, "name": "Gaming Console", "category": "Gaming", "price": 499.00, "rating": 4.8 },
//     { "id": 6, "name": "Video Game", "category": "Gaming", "price": 59.99, "rating": 4.5 },
//     { "id": 7, "name": "Gaming Mouse", "category": "Gaming", "price": 79.99, "rating": 4.6 }
//   ]
// }
