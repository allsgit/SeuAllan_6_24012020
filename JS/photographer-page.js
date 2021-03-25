const Data = fetch ('http://127.0.0.1:5501/JS/photograph-list.json')
  .then (response => response.json ())
  .then (data => {
    testoncela (data.media, data.photographers);
  });
function testoncela (media, photographers) {
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

      console.log (photographers.portrait);

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

  let likeArray = [];
  const likeResume = document.querySelector ('.resume_like_price');
  const LikeCounterFull = document.createElement ('p');
  LikeCounterFull.classList = 'total_counter_resume';
  likeResume.appendChild (LikeCounterFull);
  LikeCounterFull.innerText = likeArray;

  const heartBlack = document.createElement ('img');
  heartBlack.classList = 'heart-icon-resume';
  likeResume.appendChild (heartBlack);
  heartBlack.src = '/image/heart-black.png';

  const PricePerDay = document.createElement ('p');
  PricePerDay.classList = 'price_resume';
  likeResume.appendChild (PricePerDay);
  PricePerDay.innerText = '300€ /jours';

  const sorted = media.sort ((a, b) => b.likes - a.likes).map (element => {
 
    if (element.photographerId === 243) {
      const sortIcon = document.querySelector ('.up_arrow_icon')
      sortIcon.addEventListener('click',() => {
      
      })
      console.log(element.likes);
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

      //
      // INCREMENT EACH LIKE + TOTAL LIKE

      const inputValue = element.likes;
      likeArray.push (inputValue); // likeArray est un tableau vide
      const reducer = (acc, curr) => acc + curr;
      let sumLike = likeArray.reduce (reducer);
      tatatat = LikeCounterFull.innerText = sumLike;
      console.log (sumLike);

      heartIcon.addEventListener ('click', $event => {
        $event.stopImmediatePropagation ();
        console.log ($event);
        LikeCounterFull.innerText = tatatat++;
        console.log (element.likes);
        element.likes++;
        const like = element.likes;

        likeCounter.innerText = like; //element.likes++;
        console.log (element.likes);
      });
    }
  });

}



// afficher les tags sur page perso photographe //
const showOwnTags = function (TagElement) {
  const tagButton = document.createElement ('button');
  tagButton.classList = 'searchButton';
  tagButton.innerText = TagElement;
  profile.appendChild (tagButton);
};
/*
const mimiKeelTag = photographers[0].tags.map((element) => {
  showOwnTags(element);
})*/
