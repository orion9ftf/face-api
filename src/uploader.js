import { read } from './localStorage';
import { write } from './localStorage';
//carga de archivos
import { v4 as uuidv4 } from 'uuid'; //id del usuario

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

const uploadFile = file => {
  return new Promise((resolve, reject) => {
    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {
      fs.root.getFile(`${file.name}${uuidv4()}`, { create: true, exclusive: true }, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
              fileWriter.write(file);
              resolve(fileEntry);
          }, e => console.log(e));
      }, e => console.log(e));
    })
  })
}

const uploader = (submitSelector, imagesListSelector)=> {
  const submit = document.querySelector(submitSelector);
  const imagesList = document.querySelector(imagesListSelector);

  //formar el DOM de las img
  const syncImages = () => {
    read().forEach(async image =>{
      const imageContainer = document.createElement('div');
      const label = document.createElement('label');
      const imageElement = document.createElement('img');

    });
  }

  submit.addEventListener('change', async e => {
    //console.log('change funciona!')
    const fileEntry = await uploadFile(e.target.files[0]);
    //console.log(write({ path: 'ejemplo1' },{ path: 'ejemplo2' }));

    write([
      ...read(),
      {
        id: uuidv4(),
        path: fileEntry.fullPath,
        name: (uuidv4()).toString()
      }
    ]);
  })
  //eventos
}

export default uploader;
