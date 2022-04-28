import { read } from './localStorage';
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

  submit.addEventListener('change', async e => {
    //console.log('change funciona!')
    console.log(await uploadFile(e.target.files[0]));
    
    console.log(read());
  })
  //eventos
}

export default uploader;
