//
// DOM ELEMENT ****
//
const closeCrossButton = document.querySelector ('#close');
const contactMeButton = document.querySelector ('.contact-me');
const contactModal = document.getElementById ('modal');
const mainContainer = document.querySelector ('.main-container');
const mainContainerComponent = document.querySelector (
  '.main-container-component'
);

//
// DOM MODAL FORM ELEMENT ****
//
const firstName = document.getElementById ('prenom');
const lastName = document.getElementById ('nom');
const email = document.getElementById ('email');
const sendButton = document.querySelector ('.send');
const inputField = document.querySelectorAll ('input');


//
// MODAL INPUT FUNCTION *** SHOW INPUT IN CONSOLE ON VALIDATION
//
firstName.addEventListener ('input', () => {});
lastName.addEventListener ('input', () => {});
email.addEventListener ('input', () => {});
sendButton.addEventListener ('click', () => {
  if (!lastName.value || !firstName.value || !email.value) {
    console.log ('veuillez remplir tous les champs');
  } else {
    console.log (firstName.value);
    console.log (lastName.value);
    console.log (email.value);
    closeModal ();
    inputField.forEach (input => (input.value = ''));
  }
});

//
// SHOW MODAL ON "CONTACTER MOI" BUTTON + CLOSE MODAL ON CROSS CLICK ****//
//
contactMeButton.addEventListener ('click', showModal);
function showModal () {
  contactModal.style.display = 'block';
  contactModal.style.opacity = '1';
  mainContainer.style.filter = 'blur(4px)';
}
closeCrossButton.addEventListener ('click', closeModal);
function closeModal () {
  contactModal.style.display = 'none';
  mainContainer.style.filter = 'blur(0px)';
}
