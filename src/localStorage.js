const itemName = 'imagenes';

const read = ()=> {
  const store = localStorage.getItem(itemName);
  return store ? JSON.parse : []
}

const write = content =>{
  localStorage.setItem(itemName, JSON.stringify(content));// key && value
}

export { 
  read,
  write
}
