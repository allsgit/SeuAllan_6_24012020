const Data = fetch ('http://127.0.0.1:5501/JS/photograph-list.json')
  .then (response => response.json ())
  .then (data => {
    createHeader (data.photographers);
    createGallery (data.media);
    LikeCounterDiv (data.media);
  });

function createHeader (photographers) {
  photographers.map (element => {
    if (element.id === 243) {
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
    }
  });
}
function createGallery (media) {
  let sorted = media.sort ((a, b) => a.likes - b.likes).map (element => {
    // creation gallery
    if (element.photographerId === 243) {
      const photographerPic = document.createElement ('img');
      const thumbSection = document.querySelector ('.thumb-section');
      const galleryPic = document.createElement ('div');
      galleryPic.classList = 'thumb-img';
      thumbSection.appendChild (galleryPic);
      galleryPic.appendChild (photographerPic);
      photographerPic.src = `/image/Mimi/${element.image} `;

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

      const likeCounter = document.createElement ('p');
      likeCounter.classList = 'like_counter';
      galleryPic.appendChild (likeCounter);
      let test = (likeCounter.innerText = element.likes);
    }
  });
}
function LikeCounterDiv (media) {
  let totalLike = 0;
  media.map (element => {
    if (element.photographerId === 243) { 
      const likeArray = [];
      likeArray.push (element.likes); 
      const sumLike = element.likes;
      totalLike += element.likes;
      const heartIcon = document.querySelector('.heart-icon');
 
      heartIcon.addEventListener ('click', $event => {
        $event.stopImmediatePropagation ();
        element.likes++;
        const LikeCounterFull = document.createElement ('p');
        LikeCounterFull.innerText = sumLike++;
        const like = element.likes;
        likeCounter2.innerText = like;
      });
    }
  });
  TotalLike(totalLike);
}
function TotalLike(totalLike) {
  const likeResume = document.querySelector ('.resume_like_price');
  const LikeCounterFull = document.createElement ('p');
  const heartBlack = document.createElement ('img');
  const PricePerDay = document.createElement ('p');

  LikeCounterFull.classList = 'total_counter_resume';
  heartBlack.classList = 'heart-icon-resume';
  heartBlack.src = '/image/heart-black.png';
  PricePerDay.classList = 'price_resume';
  LikeCounterFull.innerText = totalLike;

  likeResume.appendChild (PricePerDay);
  likeResume.appendChild (LikeCounterFull);
  likeResume.appendChild (heartBlack);
}
