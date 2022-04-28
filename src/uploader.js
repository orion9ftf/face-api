//carga de archivos
const uploader = (submitSelector, imagesListSelector)=> {
  const submit = document.querySelector(submitSelector);
  const imagesList = document.querySelector(imagesListSelector);

  submit.addEventListener('change', e => {
    //console.log('change funciona!')
    console.log(e.target.files);
  })
  //eventos
}

export default uploader;
