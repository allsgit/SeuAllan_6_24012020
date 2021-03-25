 //We display the media
  /*
  medias.map((element) => {
    if (element.photographerId === 243) {
      const sortIcon = document.querySelector('.up_arrow_icon');
      sortIcon.addEventListener('click', () => {});
      console.log(element.likes);
      const photographerPic = document.createElement('img');
      const thumbSection = document.querySelector('.thumb-section');
      const galleryPic = document.createElement('div');
      galleryPic.classList = 'thumb-img';
      thumbSection.appendChild(galleryPic);
      galleryPic.appendChild(photographerPic);
      photographerPic.src = `/image/Mimi/${element.image} `;

      const picName = document.createElement('p');
      picName.classList = 'picture_name';
      galleryPic.appendChild(picName);
      picName.innerText = `${element.image}`;

      const picPrice = document.createElement('p');
      picPrice.classList = 'picture_price';
      galleryPic.appendChild(picPrice);
      picPrice.innerText = `${element.price}€`;

      const heartIcon = document.createElement('img');
      heartIcon.classList = 'heart-icon';
      galleryPic.appendChild(heartIcon);
      heartIcon.src = '/image/heart.png';

      const likeCounter = document.createElement('p');
      likeCounter.classList = 'like_counter';
      galleryPic.appendChild(likeCounter);
      let test = (likeCounter.innerText = element.likes);

      //
      // INCREMENT EACH LIKE + TOTAL LIKE


      });
    }
  });*/
};

      /*
      heartIcon.addEventListener('click', ($event) => {
        $event.stopImmediatePropagation();
        console.log($event);
        LikeCounterFull.innerText = tatatat++;
        console.log(element.likes);
        element.likes++;
        const like = element.likes;
    
        likeCounter.innerText = like; //element.likes++;
        console.log(element.likes);
      })
      */


      //
  /*
  media.map((element) => {
    if (element.photographerId === 243) {
      const sortIcon = document.querySelector('.up_arrow_icon');
      sortIcon.addEventListener('click', () => {});
      console.log(element.likes);
      const photographerPic = document.createElement('img');
      const thumbSection = document.querySelector('.thumb-section');
      const galleryPic = document.createElement('div');
      galleryPic.classList = 'thumb-img';
      thumbSection.appendChild(galleryPic);
      galleryPic.appendChild(photographerPic);
      photographerPic.src = `/image/Mimi/${element.image} `;

      const picName = document.createElement('p');
      picName.classList = 'picture_name';
      galleryPic.appendChild(picName);
      picName.innerText = `${element.image}`;

      const picPrice = document.createElement('p');
      picPrice.classList = 'picture_price';
      galleryPic.appendChild(picPrice);
      picPrice.innerText = `${element.price}€`;

      const heartIcon = document.createElement('img');
      heartIcon.classList = 'heart-icon';
      galleryPic.appendChild(heartIcon);
      heartIcon.src = '/image/heart.png';

      const likeCounter = document.createElement('p');
      likeCounter.classList = 'like_counter';
      galleryPic.appendChild(likeCounter);
      let test = (likeCounter.innerText = element.likes);

      //
      // INCREMENT EACH LIKE + TOTAL LIKE

      const inputValue = element.likes;
      likeArray.push(inputValue); // likeArray est un tableau vide
      const reducer = (acc, curr) => acc + curr;
      let sumLike = likeArray.reduce(reducer);
      tatatat = LikeCounterFull.innerText = sumLike;
      console.log(sumLike);

      heartIcon.addEventListener('click', ($event) => {
        $event.stopImmediatePropagation();
        console.log($event);
        LikeCounterFull.innerText = tatatat++;
        console.log(element.likes);
        element.likes++;
        const like = element.likes;

        likeCounter.innerText = like; //element.likes++;
        console.log(element.likes);
      });
    }
  });*/
}

/*
    const inputValue = element.likes;
    likeArray.push (inputValue); // likeArray est un tableau vide
    const reducer = (acc, curr) => acc + curr;
    let sumLike = likeArray.reduce (reducer);
    tatatat = LikeCounterFull.innerText = sumLike;
    }
*/




/*

const sortPhotographs = sortField => {
  //alert(sortField);
  //We clear the page
  document.querySelector ('.thumb-section').innerHTML = '';

  let mediaSorted = [];
  if (sortField === 'popularite') {
    mediaSorted = medias.sort (sortByPopularity);
  }

  if (sortField === 'date') {
    mediaSorted = medias.sort (sortByPopularity);
  }

  if (sortField === 'titre') {
    mediaSorted = medias.sort (sortByPopularity);
  }

  mediaSorted.map (element => {

};

// afficher les tags sur page perso photographe //
const showOwnTags = function (TagElement) {
  const tagButton = document.createElement ('button');
  tagButton.classList = 'searchButton';
  tagButton.innerText = TagElement;
  profile.appendChild (tagButton);
};


/*
// afficher les tags sur page perso photographe //
const showOwnTags = function (TagElement) {
  const tagButton = document.createElement ('button');
  tagButton.classList = 'searchButton';
  tagButton.innerText = TagElement;
  profile.appendChild (tagButton);
};

const mimiKeelTag = photographers[0].tags.map (element => {
  showOwnTags (element);
});
*/