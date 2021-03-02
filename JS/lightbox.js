//
// DOM ELEMENT ****
//
const closeCrossLightBox = document.querySelector ('#close-lightbox');
const lightBox = document.querySelector ('.lightBox-container');

//
// CLOSE LIGHTBOX ******
//
closeCrossLightBox.addEventListener ('click', () => {
  lightBox.style.display = 'none';
});
