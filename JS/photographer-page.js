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
    //LikeCounterDiv(data.media);
  });

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
    });
}
function createGallery (media) {
  let sorted = media
    .filter (photo => photo.photographerId == idPhotographer)
    .sort ((a, b) => a.likes - b.likes)
    .map (element => {
      // creation gallery
      const photographerPic = document.createElement ('img');
      const thumbSection = document.querySelector ('.thumb-section');
      const galleryPic = document.createElement ('div');
      galleryPic.classList = 'thumb-img';
      thumbSection.appendChild (galleryPic);
      galleryPic.appendChild (photographerPic);
      photographerPic.classList = "pictures"
      photographerPic.src = `/image/${namePhotographer}/${element.image} `;

      const picName = document.createElement ('p');
      picName.classList = 'picture_name';
      galleryPic.appendChild (picName);
      picName.innerText = `${element.image}`;

      const picPrice = document.createElement ('p');
      picPrice.classList = 'picture_price';
      galleryPic.appendChild (picPrice);
      picPrice.innerText = `${element.price}€`;

      const heartIcon = document.createElement ('img');
      heartIcon.classList = 'heart-icon';
      galleryPic.appendChild (heartIcon);
      heartIcon.src = '/image/heart.png';

      var likes = element.likes;
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
const likeArray = [];
function totalLike (media, photographers) {
  // CREATE BOTTOM COUNTER //
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
.filter (photo =>photo.id.toString() === idPhotographer)
.map (element => {
  pricePerDay.innerText = `${element.price} €`;
});

  // SUM OF THE LIKE //
media
    .filter (photo => photo.photographerId == idPhotographer)
    .map (element => {
      likeArray.push (element.likes);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      totalLikeBottom = likeArray.reduce (reducer);
      LikeCounterFull.innerText = totalLikeBottom;
    });

}



