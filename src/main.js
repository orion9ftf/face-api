
import 'babel-polyfill';

//promesas
const main = async ()=> {
  const videoContainer = document.querySelector('.js-video');
  const canvas = document.querySelector('.js-canvas');
  const context = canvas.getContext('2d');
  const video = await navigator.mediaDevices.getUserMedia({video: true}); //pedir permiso a la cámara

  videoContainer.srcObject = video;
  const reDraw = async () => {
    context.drawImage(videoContainer, 0, 0, 640, 480);//nos permite dibujar el contexto(rostro)
    requestAnimationFrame(reDraw);
  }
  requestAnimationFrame(reDraw);
}

main();