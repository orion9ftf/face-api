
import 'babel-polyfill';

//promesas
const main = async ()=> {
  const videocontainer = document.querySelector('.js-video');
  const canvas = document.querySelector('.js-canvas');
  const context = canvas.getContext('2d');
  const video = await navigator.mediaDevices.getUserMedia({video: true}); //pedir permiso a la cámara
  
}

main();