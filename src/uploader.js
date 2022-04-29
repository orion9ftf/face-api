import { read } from './localStorage';
import { write } from './localStorage';
import { destroy } from './localStorage';

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

//traer ruta de las img
const fileEntryPathToObjectUrl = async fileEntryPath => {
  return URL.createObjectURL(await new Promise((resolve, reject)=> {
    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {
      fs.root.getFile(fileEntryPath, { create: true, exclusive: false }, function (fileEntry) {
        fileEntry.file(resolve, reject)
      }, e => console.log(e));
    })
  }))
}

const uploader = (submitSelector, imagesListSelector)=> {
  const submit = document.querySelector(submitSelector);
  const imagesList = document.querySelector(imagesListSelector);

  //formar el DOM de las img
  const syncImages = () => {

    //reiniciar valores | evita que se duplique
    while(imagesList.firstChild) {
      imagesList.removeChild(imagesList.firstChild);
    }

    read().forEach(async image =>{
      const imageContainer = document.createElement('div');
      const label = document.createElement('input');
      const imageElement = document.createElement('img');

      //status
      const deleteLink = document.createElement('a');
      imageContainer.classList.add('image-container');
      deleteLink.classList.add('cerrar');
      imageElement.classList.add('card-img-top');
      imageContainer.id = image.id;
      deleteLink.href = '#';
      deleteLink.innerText = 'x';

      //status classList

      imageElement.src = await fileEntryPathToObjectUrl(image.path);
      label.value = image.name;

      //eliminar img
      deleteLink.addEventListener('click', e =>{
        e.preventDefault();
        destroy(image.id);
        syncImages();
      });
      //fin del evento eliminar

      imageContainer.appendChild(deleteLink);
      imageContainer.appendChild(imageElement); //elemento de la img
      imageContainer.appendChild(label);
      imagesList.appendChild(imageContainer);
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
    ])
    syncImages();
  })
  //eventos
}

export default uploader;
