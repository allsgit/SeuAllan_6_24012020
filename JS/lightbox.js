//
// DOM ELEMENT ****
//
/* const closeCrossLightBox = document.querySelector ('#close-lightbox');

const body = document.querySelector('body')
const lightBox = document.createElement ('div');
lightBox.classList ='lightBox-container';
document.body.appendChild(lightBox);
 */

/* console.log(images);
lightBox.innerHTML = `      <button class="navigation-back"></button>
<button class="navigation-next"></button>
<div class="lightBox-modal">
  <img src="/image/Mimi/Travel_HillsideColor.jpg" alt="">
  <p>Arc-en-ciel</p>
</div>
<button id="close-lightbox"></button>` */



const pictures = document.getElementsByClassName ('pictures')
let toto = [...pictures];
console.log(pictures);
console.log(toto);
Array.from(document.getElementsByClassName("pictures")).forEach(
  function() {
      console.log("test 1111");
  }
);


/* pictures.forEach(image => {
  image.addEventListener('click', (e) => {
    console.log("testclick");
  })
  
}); */







