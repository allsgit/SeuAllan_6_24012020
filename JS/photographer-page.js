//Retrieve URL parameter
const queryString = window.location.search;
const photographerUrl = new URLSearchParams (queryString);
const idPhotographer = photographerUrl.get ('photographerid');
const namePhotographer = photographerUrl.get ('photographername');

const Data = fetch ('http://127.0.0.1:5501/JS/photograph-list.json')
  .then (response => response.json ())
  .then (data => {
    createHeader (data.photographers);
    createGallery (data.media);
    totalLike (data.media, data.photographers);
    lightBoxShow (data.media);
    addNameOfContact (data.photographers);
    filterBy (data.media);
  });

// NOTE // * CREATE HEADER ****/
function createHeader (photographers) {
  photographers
    .filter (photographer => photographer.id == idPhotographer)
    .map (element => {
      const headerProfil = document.querySelector ('.photographer-header');
      const profile = document.querySelector ('.photographer-profile');
      const photographerName = document.createElement ('h1');
      const photographerLocation = document.createElement ('p');
      const photographerTagLine = document.createElement ('p');
      const photographerPrice = document.createElement ('p');
      const IdPhoto = document.createElement ('div');

      const IdPhotoImg = document.createElement ('img');
      IdPhotoImg.src = `/image/Photographers ID Photos/${element.portrait}`;

      IdPhoto.classList = 'id-picture';
      photographerName.classList = 'photographer-name';
      photographerLocation.classList = 'photographer-location-profile';
      photographerTagLine.classList = 'photographer-tag-profile';
      photographerPrice.classList = 'photographer-price-profile';

      headerProfil.appendChild (IdPhoto);
      IdPhoto.appendChild (IdPhotoImg);
      profile.appendChild (photographerName);
      profile.appendChild (photographerLocation);
      profile.appendChild (photographerPrice);
      profile.appendChild (photographerTagLine);

      photographerName.innerText = element.name;
      photographerTagLine.innerText = element.tagline;
      photographerLocation.innerText = `${element.city} , ${element.country}`;
      photographerPrice.innerText = `${element.price} €/ jours`;

      let tagElement = element.tags;
      const tagSet = [...new Set (tagElement)];
      tagSet.map (tag => {
        const tagButton = document.createElement ('button');
        tagButton.classList = 'searchButton';
        tagButton.innerText = tag;
        profile.appendChild (tagButton);
      });
    });
}
// NOTE // * CREATE GALLERY ****/
function createGallery (media) {
  let sorted = media
    .filter (photo => photo.photographerId == idPhotographer)
    /*     .sort ((a, b) => b.likes - a.likes) */
    .map (element => {
      let photographerPic = document.createElement ('img');
      const thumbSection = document.querySelector ('.thumb-section');
      const galleryPic = document.createElement ('div');
      galleryPic.classList = 'thumb-img';
      thumbSection.appendChild (galleryPic);
      galleryPic.appendChild (photographerPic);
      photographerPic.classList = 'pictures';
      photographerPic.src = `/image/${namePhotographer}/${element.image}`;
      /*       if (element.video){
        let photographerPic = document.createElement ('video');
        galleryPic.classList = 'thumb-videp'
        photographerPic.classList = 'video';
        galleryPic.appendChild (photographerPic);
        photographerPic.src = `/image/${namePhotographer}/${element.video}`;
        console.log(photographerPic);
      }
     */
      
      const picName = document.createElement ('p');
      picName.classList = 'picture_name';
      galleryPic.appendChild (picName);
      if (element.image) {
        let regex = /(_)|(.jpg)/g;
        let replacedName = element.image.replace (regex, ' ');
        picName.innerText = replacedName;
      } else {
        picName.innerText = 'undefined';
      }

      const picPrice = document.createElement ('p');
      picPrice.classList = 'picture_price';
      galleryPic.appendChild (picPrice);
      picPrice.innerText = `${element.price}€`;

      const heartIcon = document.createElement ('img');
      heartIcon.classList = 'heart-icon';
      galleryPic.appendChild (heartIcon);
      heartIcon.src = '/image/heart.png';

      let likes = element.likes;
      const likeCounter = document.createElement ('p');
      likeCounter.classList = 'like_counter';
      likeCounter.innerText = likes;
      galleryPic.appendChild (likeCounter);

      heartIcon.addEventListener ('click', $event => {
        likes++;
        likeCounter.innerText = likes;
      });
    });
}
// NOTE  // * CREATE BOTTOM COUNTER **** //
const likeArray = [];
function totalLike (media, photographers) {
  const likeResume = document.querySelector ('.resume_like_price');
  const LikeCounterFull = document.createElement ('p');
  const heartBlack = document.createElement ('img');
  const pricePerDay = document.createElement ('p');

  LikeCounterFull.classList = 'total_counter_resume';
  heartBlack.classList = 'heart-icon-resume';
  heartBlack.src = '/image/heart-black.png';
  pricePerDay.classList = 'price_resume';
  likeResume.appendChild (LikeCounterFull);
  likeResume.appendChild (heartBlack);
  likeResume.appendChild (pricePerDay);

  photographers
    .filter (photo => photo.id.toString () === idPhotographer)
    .map (element => {
      pricePerDay.innerText = `${element.price} €`;
    });

  // NOTE //* SUM OF LIKES ON THE BOTTOM **** //

  media
    .filter (photo => photo.photographerId == idPhotographer)
    .map (element => {
      likeArray.push (element.likes);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      totalLikeBottom = likeArray.reduce (reducer);
      LikeCounterFull.innerText = totalLikeBottom;
    });

  document.querySelectorAll ('.heart-icon').forEach (heatImg => {
    heatImg.addEventListener ('click', () => {
      totalLikeBottom++;
      LikeCounterFull.innerText = totalLikeBottom;
    });
  });
}
// NOTE // * FILTER BY FUNCTION IN MENU **** //
function filterBy (media) {
  media.filter (photo => photo.photographerId == idPhotographer)
 
  const filterMenu = [...document.getElementsByClassName ('btntest')];

    filterMenu.forEach (filterBtn => {
      filterBtn.addEventListener ('click', event => {
        document.querySelector ('.thumb-section').innerHTML = ' ';
        let mediaSorted = [];
        if (event.target.innerText === 'FILTRE') {
          mediaSorted = media.sort ((a, b) => b.likes - a.likes);
        } else if (event.target.innerText === 'DATE') {
          mediaSorted = media.sort ((a, b) => new Date (b.date) - new Date (a.date));
          console.log(mediaSorted);
        } else if (event.target.innerText === 'NAME') {
          mediaSorted = media.sort ((a, b) =>  (a.video || a.image).localeCompare(b.image || b.video));
        }
        createGallery (mediaSorted);
        lightBoxShow ();
      });
    });
  };


// NOTE // * LIGHTBOX FUNCTION **** //
function lightBoxShow () {
  const lightbox = document.querySelector ('.lightBox-container');
  const pictures = document.getElementsByClassName ('pictures');
  const picName = document.createElement ('p');
  picName.classList = 'picture_name';
  lightbox.appendChild (picName);

  let arrayPictures = [...pictures];
  arrayPictures.forEach (image => {
    image.addEventListener ('click', e => {
      let img = document.createElement ('img');
      img.src = e.target.src;

      let lightboxPicName = document.createElement ('p');
      lightboxPicName.innerText = e.currentTarget.src;
      lightbox.appendChild (lightboxPicName);
      console.log (e.target);

      let i = arrayPictures.indexOf (e.currentTarget);
      let lightBoxBox = document.querySelector ('.lightBox-modal');
      while (lightBoxBox.firstChild) {
        lightBoxBox.removeChild (lightBoxBox.firstChild);
      }
      lightBoxBox.appendChild (img);
      lightbox.style.display = 'block';

      // NOTE // * LIGHTBOX NAVIGATION **** /

      const next = document.querySelector ('.navigation-next');
      const previous = document.querySelector ('.navigation-back');
      next.addEventListener ('click', () => {
        if (i >= arrayPictures.length - 1) i = -1;
        i++;
        img.src = pictures[i].src;
        lightboxPicName.innerText = pictures[i].src;
      });
      previous.addEventListener ('click', () => {
        if (i <= 0) i = arrayPictures.length;
        i--;
        img.src = pictures[i].src;
        lightboxPicName.innerText = pictures[i].src;
      });
    });
  });
  //
  //**CLOSE LIGHTBOX ON CLICK  */
  document.getElementById ('close-lightbox').addEventListener ('click', () => {
    lightbox.style.display = 'none';
  });
}

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
function addNameOfContact (photographers) {
  photographers
    .filter (photo => photo.id.toString () === idPhotographer)
    .map (element => {
      const contactName = document.createElement ('h2');
      const contactWord = document.querySelector ('h1');
      contactModal.appendChild (contactName);
      contactModal.insertBefore (contactName, contactModal.children[2]);
      contactName.innerText = element.name;
    });
}

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
