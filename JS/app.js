const Data = fetch('http://127.0.0.1:5501/JS/photograph-list.json')
  .then((response) => response.json())
  .then((data) => {
    tagAction(data.photographers);
    displayPhotographers(data.photographers);
    photographerPage(data.photographers);
  });

const getFirstName = (name) => {
  return name.split(' ')[0].replace('-', ' ');
};

function displayPhotographers(photographers) {
  const mainSection = document.querySelector('.main-section'); // selectionne thumb
  mainSection.innerHTML = '';

  for (let i = 0; i < photographers.length; i++) {
    const thumBofPhotographer = document.createElement('section');
    thumBofPhotographer.className = 'thumb-photographer';
    mainSection.appendChild(thumBofPhotographer);

    // ***** PHOTOGRAPHER PICTURE *******
    const photoId_pic = document.createElement('div');
    photoId_pic.className = 'id-picture';
    const image = document.createElement('img');
    thumBofPhotographer.appendChild(photoId_pic);
    image.src = `/image/Photographers ID Photos/${photographers[i].portrait}`;
    photoId_pic.appendChild(image);

    // ***** PHOTOGRAPHER NAME ******
    const photographerName = document.createElement('h2');
    thumBofPhotographer.appendChild(photographerName);
    photographerName.innerText = photographers[i].name;

    // ****** PHOTOGRAPHER DESCRIPTION ******
    const photograDescript = document.createElement('div');
    photograDescript.className = 'description';
    thumBofPhotographer.appendChild(photograDescript);

    const photographerLocation = document.createElement('p');
    const photographerTagLine = document.createElement('p');
    const photographerPrice = document.createElement('p');

    photographerLocation.classList = 'photographer-location';
    photographerTagLine.classList = 'photographer-tag';
    photographerPrice.classList = 'photographer-price';

    // ***** PHOTOGRAPHER URL *******
    const url = document.createElement('a');
    url.innerHTML = 'click here';
    url.href =
      'photographer-page.html?photographerid=' +
      photographers[i].id +
      '&photographername=' +
      getFirstName(photographers[i].name);

    photograDescript.appendChild(url);

    photograDescript.appendChild(photographerLocation);
    photograDescript.appendChild(photographerPrice);
    photograDescript.appendChild(photographerTagLine);

    photographerTagLine.innerText = photographers[i].tagline;
    photographerLocation.innerText = `${photographers[i].city} , ${photographers[i].country}`;
    photographerPrice.innerText = `${photographers[i].price} €/ jours`;

    // ****** PHOTOGRAPHER TAGS ******
    const photographerTag = document.createElement('div');
    photographerTag.className = 'search-label';
    thumBofPhotographer.appendChild(photographerTag);

    for (let j = 0; j < photographers[i].tags.length; j++) {
      let tagButton = document.createElement('button');
      tagButton.className = 'searchButton';
      tagButton.innerText = `#${photographers[i].tags[j]}`;
      photographerTag.appendChild(tagButton);
    }
  }
}

function tagAction(photographers) {
  const navTag = document.querySelector('nav');

  const allTags = photographers.reduce((acc, curr) => {
    acc.push(...curr.tags); // "..." chaque élément à la suite
    return acc;
  }, []);

  const distinctTags = [...new Set(allTags)];
  console.log(distinctTags);

  distinctTags.map((tag) => {
    const filterButton = document.createElement('button');
    filterButton.className = 'searchButton';
    filterButton.innerText = tag;

    filterButton.addEventListener('click', () => {
      console.log(tag);

      const displayChanger = document.querySelector('.main-section');
      displayChanger.style.justifyContent = 'center';

      const result = photographers.filter((photographer) => {
        return photographer.tags.some((t) => t.includes(tag));
      });
      displayPhotographers(result);
      console.log(result);
    });
    navTag.appendChild(filterButton);
  });
}

function photographerPage() {
  console.log(photographers[0]);
  const profile = document.querySelector('.photographer-profile');
  console.log(profile);
}
