//
// DOM ELEMENT ****
//
const closeCrossLightBox = document.querySelector ('#close-lightbox');
const lightBox = document.querySelector ('.lightBox-container');
const body = document.querySelector('body')
console.log(body);
//
// CLOSE LIGHTBOX ******
//


// CLOSE LIGHTBOX
closeCrossLightBox.addEventListener ('click', () => {
  lightBox.style.display = 'none';
  body.style.position = 'relative';
});

// DISABLE SCROLL WHEN LIGHTBOX IS OPEN
// function stickyModal(){
//   if (lightBox.style.display = "flex"){
//     body.style.position = 'fixed';
//   } 
// }
// stickyModal()
