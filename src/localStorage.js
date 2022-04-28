const itemName = 'imagenes';

const read = ()=> {
  const store = localStorage.getItem(itemName);
  return store ? JSON.parse : []
}
export { 
  read
}
