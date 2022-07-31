fetch('JS/photograph-list.json')
	.then((response) => response.json())
	.then((data) => {
		tagAction(data.photographers);
		displayPhotographers(data.photographers);
		labelShow()

	});

const getFirstName = (name) => {
	return name.split(' ')[0].replace('-', ' ');
};
function displayPhotographers(photographers) {
	const mainSection = document.querySelector('.main-section'); // selectionne thumb
	mainSection.innerHTML = '';
	photographers.map(element => {
			const thumBofPhotographer = document.createElement('section');
			thumBofPhotographer.className = 'thumb-photographer';
			mainSection.appendChild(thumBofPhotographer);
	
			// ***** PHOTOGRAPHER PICTURE *******
			const photoId_pic = document.createElement('div');
			photoId_pic.className = 'id-picture';
			photoId_pic.setAttribute("aria-label", "photo de profil")

			
			const image = document.createElement('img');
			image.src = `/image/Photographers ID Photos/${element.portrait}`;
			photoId_pic.appendChild(image);
	
			// ***** PHOTOGRAPHER NAME ******
			const photographerName = document.createElement('h2');
			photographerName.innerText = element.name;
	
			// ****** PHOTOGRAPHER DESCRIPTION ******
	
			const photographerLocation = document.createElement('p');
			const photographerTagLine = document.createElement('p');
			const photographerPrice = document.createElement('p');
	
			photographerLocation.classList = 'photographer-location';
			photographerTagLine.classList = 'photographer-tag';
			photographerPrice.classList = 'photographer-price';

			
			
	
			// ***** PHOTOGRAPHER URL *******
			const url = document.createElement('a');
			url.classList = 'description';
			url.href =
				'/html/photographer-page.html?photographerid=' +
				element.id +
				'&photographername=' +
				getFirstName(element.name);
	
			thumBofPhotographer.appendChild(url);
	
			url.appendChild(photoId_pic);
			url.appendChild(photographerName);

	
			photographerTagLine.innerText = element.tagline;
			photographerLocation.innerText = `${element.city} , ${element.country}`;
			photographerPrice.innerText = `${element.price} €/ jours`;
			
			const information = document.createElement("div")
			information.classList = ("information");
			information.appendChild(photographerLocation)
			information.appendChild(photographerTagLine)
			information.appendChild(photographerPrice)
			
			thumBofPhotographer.appendChild(information)
	
			// ****** PHOTOGRAPHER TAGS ******
			const photographerTag = document.createElement('div');
			photographerTag.className = 'search-label';
			thumBofPhotographer.appendChild(photographerTag);
	
			for (let j = 0; j < element.tags.length; j++) {
				let tagButton = document.createElement('button');
				tagButton.className = 'searchButton';
				tagButton.innerText = `#${element.tags[j]}`;
				photographerTag.appendChild(tagButton);
			}
		
	})
};
function tagAction(photographers) {
	const navTag = document.querySelector('nav');
	navTag.setAttribute("aria-label", "photographer catégories")

	const allTags = photographers.reduce((acc, curr) => {
		acc.push(...curr.tags); // "..." chaque élément à la suite
		return acc;
	}, []);

	const distinctTags = [...new Set(allTags)];

	distinctTags.map((tag) => {
		const filterButton = document.createElement('button');
		filterButton.className = 'searchButton';
		filterButton.innerText = `#${tag}`;

        // filter by tags
		filterButton.addEventListener('click', () => {

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
};
function labelShow () {
	const labelButton  = document.querySelector(".label")
	window.addEventListener("scroll", () => {
		const scrolled = window.scrollY
		

		if (scrolled > 114) {
			labelButton.style.display = "block"
	
		} else {
			labelButton.style.display = "none"
		}
	})
	labelButton.addEventListener('click', () => {
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0;
	})

};



