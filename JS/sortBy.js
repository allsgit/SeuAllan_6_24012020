//
// DOM ELEMENT ****
//
const sortByMenu = document.querySelector ('.dropdown-open');
const sortByButton = document.querySelector ('.up_arrow_icon');

//
// OPEN AND CLOSE SORTBY MENU ****
//
let isSetMenuOpen = false;
sortByButton.addEventListener ('click', () => {
  if (isSetMenuOpen == false) {
    sortByMenu.style.height = '170px';
    sortByButton.style.transform = 'rotate(180deg)';
    isSetMenuOpen = true;
  } else {
    sortByMenu.style.height = '55px';
    sortByButton.style.transform = 'rotate(0deg)';
    isSetMenuOpen = false;
  }
});
