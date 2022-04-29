const itemName = 'imagenes';

const read = ()=> {
  const store = localStorage.getItem(itemName);
  return store ? JSON.parse(store) : []
}

const write = content =>{
  localStorage.setItem(itemName, JSON.stringify(content));// key && value
}

//eliminar img
const destroy = id => {
  const tmp = [...read()];
  const index = tmp.findIndex(item => item.id === id); //buscar por indice y eliminar
  tmp.splice(index,1)
  write(tmp);
}

export { 
  read,
  write,
  destroy
}
