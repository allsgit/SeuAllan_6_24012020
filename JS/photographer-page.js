const Data = fetch ('http://127.0.0.1:5501/JS/photograph-list.json')
  .then (response => response.json ())
  .then (data => {

    const headerProfil = document.querySelector ('.photographer-header');
    const profile = document.querySelector ('.photographer-profile');
    const photographerName = document.createElement ('h1');
    const photographerLocation = document.createElement ('p');
    const photographerTagLine = document.createElement ('p');
    const photographerPrice = document.createElement ('p');
    const IdPhoto = document.createElement ('div');

    const IdPhotoImg = document.createElement ('img');
    IdPhotoImg.src = `/image/Photographers ID Photos/${data.photographers[0].portrait}`;

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

    photographerName.innerText = data.photographers[0].name;
    photographerTagLine.innerText = data.photographers[0].tagline;
    photographerLocation.innerText = `${data.photographers[0].city} , ${data.photographers[0].country}`;
    photographerPrice.innerText = `${data.photographers[0].price} €/ jours`;

    const likeResume = document.querySelector ('.resume_like_price');
    const LikeCounterFull = document.createElement ('p');
    LikeCounterFull.classList = 'total_counter_resume';
    likeResume.appendChild(LikeCounterFull);
    LikeCounterFull.innerText = "000";

    const heartBlack = document.createElement ('img')
    heartBlack.classList = 'heart-icon-resume';
    likeResume.appendChild(heartBlack);
    heartBlack.src = "/image/heart-black.png"
    
    const PricePerDay = document.createElement ('p')
    PricePerDay.classList = 'price_resume';
    likeResume.appendChild(PricePerDay);
    PricePerDay.innerText = "300€ /jours"

    for (let j = 0; j < data.media.length; j++){
      if (data.media[j].photographerId === 243){
        const photographerPic = document.createElement ('img');
        const thumbSection = document.querySelector ('.thumb-section');
        const galleryPic = document.createElement ('div');
        galleryPic.classList = 'thumb-img';
        thumbSection.appendChild (galleryPic);
        photographerPic.src = `/image/Mimi/${data.media[j].image} `;
        galleryPic.appendChild (photographerPic);
      }
    }
   
// boucle pour afficher  gallery des photographes 
    /*for (let j = 0; j < data.media.length; j++) {
      if (data.media[j].photographerId === 243) {
        const photographerPic = document.createElement ('img');

        const thumbSection = document.querySelector ('.thumb-section');
        const galleryPic = document.createElement ('div');
        galleryPic.classList = 'thumb-img';
        thumbSection.appendChild (galleryPic);

        galleryPic.appendChild (photographerPic);
        photographerPic.src = `/image/Mimi/${data.media[j].image} `;

        const picName = document.createElement ('p');
        picName.classList = 'picture_name';
        galleryPic.appendChild (picName);
        picName.innerText = `${data.media[j].image}`;

        const picPrice = document.createElement ('p');
        picPrice.classList = 'picture_price';
        galleryPic.appendChild (picPrice);
        picPrice.innerText = `${data.media[j].price}€`;



///////

        const heartIcon = document.createElement ('img');
        heartIcon.classList = 'heart-icon';
        galleryPic.appendChild (heartIcon);
        heartIcon.src = '/image/heart.png';

        const likeCounter = document.createElement ('p');
        likeCounter.classList = 'like_counter';
        galleryPic.appendChild (likeCounter);

        likeCounter.innerText = data.media[j].likes;
        const testb = document.querySelector ('.heart-icon');
        let haha = data.media[j].likes;
        console.log(haha);
        
        testb.addEventListener ('click', function (event) {
          let buttonClicked = event.target
          if (buttonClicked) {
            haha++;
            console.log (haha);
            likeCounter.innerText = haha;
          }
          
        
        });
      }
    };*/

// afficher les tags sur page perso photographe //
const showOwnTags = function (element){
      const tagButton = document.createElement ('button');
      tagButton.classList = 'searchButton';
      tagButton.innerText = (element);
      profile.appendChild (tagButton);
}
const mimiKeelTag = data.photographers[0].tags.map(element => element)
showOwnTags(mimiKeelTag);



  });
