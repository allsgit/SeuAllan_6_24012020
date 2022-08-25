//Retrieve URL parameter
'use strict';
const queryString = window.location.search;
const photographerUrl = new URLSearchParams(queryString);
const idPhotographer = photographerUrl.get('photographerid');
const namePhotographer = photographerUrl.get('photographername');

fetch('../JS/photograph-list.json')
	.then((response) => response.json())
	.then((data) => {
		createHeader(data.photographers);
		createGallery(data.media);
		totalLike(data.media, data.photographers);
		lightBoxShow(data.media);
		contactFunction(data.photographers);
		filterBy(data.media, data.photographers);
	});

// NOTE // * CREATE HEADER ****/
function createHeader(photographers) {
	photographers
		.filter((photographer) => photographer.id == idPhotographer)
		.map((element) => {
			const headerProfil = document.querySelector('.photographer-header');
			const profile = document.querySelector('.photographer-profile');
			const photographerName = document.createElement('h1');
			const photographerLocation = document.createElement('p');
			const photographerTagLine = document.createElement('p');
			const photographerPrice = document.createElement('p');
			const IdPhoto = document.createElement('div');

			const IdPhotoImg = document.createElement('img');
			IdPhotoImg.src = `../image/Photographers ID Photos/${element.portrait}`;

			IdPhoto.classList = 'id-picture';
			IdPhoto.setAttribute('alt', ' ');
			photographerName.classList = 'photographer-name';
			photographerLocation.classList = 'photographer-location-profile';
			photographerTagLine.classList = 'photographer-tag-profile';

			headerProfil.appendChild(IdPhoto);
			IdPhoto.appendChild(IdPhotoImg);
			profile.appendChild(photographerName);
			profile.appendChild(photographerLocation);
			profile.appendChild(photographerTagLine);

			photographerName.innerText = element.name;
			photographerTagLine.innerText = element.tagline;
			photographerLocation.innerText = `${element.city} , ${element.country}`;
			photographerPrice.innerText = `${element.price} €/ jours`;

			let tagElement = element.tags;
			const tagSet = [...new Set(tagElement)];
			tagSet.map((tag) => {
				const tagButton = document.createElement('button');
				tagButton.classList = 'searchButton';
				tagButton.innerText = `#${tag}`;
				profile.appendChild(tagButton);
			});
		});
}
// NOTE // * CREATE GALLERY ****/
function createGallery(media) {
	media
		.filter((photo) => photo.photographerId == idPhotographer)
		.map((element) => {
			if (element.image) {
				// Picture Gallery
				const regex = /(_)|(.jpg)/g;
				let replacedName = element.image.replace(regex, ' ');
				let photographerPic = document.createElement('img');
				const thumbSection = document.querySelector('.thumb-section');
				thumbSection.setAttribute('aria-label', 'gallerie photo');
				const galleryPic = document.createElement('article');
				galleryPic.classList = 'thumb-img';
				photographerPic.setAttribute('tabindex', '2');
				thumbSection.appendChild(galleryPic);
				galleryPic.appendChild(photographerPic);
				photographerPic.classList = 'pictures';
				photographerPic.setAttribute('aria-label', 'photographie');
				photographerPic.src = `../image/${namePhotographer}/${element.image}`;
				photographerPic.setAttribute(
					'aria-label',
					`${replacedName}, closeup view`
				);
				// Name of picture
				const picName = document.createElement('p');
				picName.classList = 'picture_name';
				galleryPic.appendChild(picName);
				picName.innerText = replacedName;
				// Price of picture
				const picPrice = document.createElement('p');
				picPrice.classList = 'picture_price';
				galleryPic.appendChild(picPrice);
				picPrice.innerText = `${element.price}€`;
				// Like of picture
				const heartIcon = document.createElement('img');
				heartIcon.setAttribute('tabindex', '2');
				heartIcon.classList = 'heart-icon';
				heartIcon.setAttribute('alt', 'like');
				galleryPic.appendChild(heartIcon);
				heartIcon.src = '../image/heart.png';
				// increment like function
				let likes = element.likes;
				const likeCounter = document.createElement('p');
				likeCounter.classList = 'like_counter';
				likeCounter.innerText = likes;
				galleryPic.appendChild(likeCounter);

				heartIcon.addEventListener('click', () => {
					likes++;
					likeCounter.innerText = likes;
				});
				heartIcon.addEventListener('keydown', (e) => {
					if (e.key == 'Enter') {
						likes++;
						likeCounter.innerText = likes;
					}
				});
			} else if (element.video) {
				// video gallery
				const regexVideo = /(_)|(.mp4)|(587740985637)/g;
				let replacedName = element.video.replace(regexVideo, ' ');
				let photographerPic = document.createElement('video');
				const thumbSection = document.querySelector('.thumb-section');
				const galleryPic = document.createElement('article');
				galleryPic.classList = 'thumb-img';
				photographerPic.setAttribute('tabindex', '2');
				thumbSection.appendChild(galleryPic);
				galleryPic.appendChild(photographerPic);
				photographerPic.classList = 'pictures';
				photographerPic.setAttribute(
					'aria-label',
					`${replacedName}, closeup view`
				);
				photographerPic.src = `../image/${namePhotographer}/${element.video}`;
				// Name of video
				const picName = document.createElement('p');
				picName.classList = 'picture_name';
				galleryPic.appendChild(picName);
				// Price of video
				const picPrice = document.createElement('p');
				picPrice.classList = 'picture_price';
				galleryPic.appendChild(picPrice);
				picPrice.innerText = `${element.price}€`;
				// increment like function
				const heartIcon = document.createElement('img');
				heartIcon.classList = 'heart-icon';
				heartIcon.setAttribute('alt', 'like');
				heartIcon.setAttribute('tabindex', '2');
				galleryPic.appendChild(heartIcon);
				heartIcon.src = '../image/heart.png';

				let likes = element.likes;
				const likeCounter = document.createElement('p');
				likeCounter.classList = 'like_counter';
				likeCounter.innerText = likes;
				galleryPic.appendChild(likeCounter);

				picName.innerText = replacedName;

				heartIcon.addEventListener('click', () => {
					likes++;
					likeCounter.innerText = likes;
				});
			}
		});
}
// NOTE  // * CREATE BOTTOM COUNTER **** //
function totalLike(media, photographers) {
	const likeResume = document.querySelector('.resume_like_price');
	const LikeCounterFull = document.createElement('p');
	const heartBlack = document.createElement('img');
	const pricePerDay = document.createElement('p');

	LikeCounterFull.classList = 'total_counter_resume';
	heartBlack.classList = 'heart-icon-resume';
	heartBlack.src = '../image/heart-black.png';
	pricePerDay.classList = 'price_resume';
	likeResume.appendChild(LikeCounterFull);
	likeResume.appendChild(heartBlack);
	likeResume.appendChild(pricePerDay);
	// PRICE PER DAY
	photographers
		.filter((photo) => photo.id.toString() === idPhotographer)
		.map((element) => {
			pricePerDay.innerText = `${element.price} €/jour`;
		});
	const likeArray = [];
	let totalLikeBottom;
	// NOTE //* SUM OF LIKES ON THE BOTTOM **** //
	media
		.filter((photo) => photo.photographerId == idPhotographer)
		.map((element) => {
			likeArray.push(element.likes);
			const reducer = (accumulator, currentValue) =>
				accumulator + currentValue;

			totalLikeBottom = likeArray.reduce(reducer);
			LikeCounterFull.innerText = totalLikeBottom;
		});
	// Keyboad and click management
	document.querySelectorAll('.heart-icon').forEach((heatImg) => {
		heatImg.addEventListener('click', () => {
			totalLikeBottom++;
			LikeCounterFull.innerText = totalLikeBottom;
		});
		heatImg.addEventListener('keydown', (e) => {
			console.log(e.key);
			if (e.key == 'Enter') {
				totalLikeBottom++;
				LikeCounterFull.innerText = totalLikeBottom;
			}
		});
	});
}
// NOTE // * "FILTER BY" IN MENU **** //
function filterBy(media, photographers) {
	media.filter((photo) => photo.photographerId == idPhotographer);

	const filterMenu = [...document.getElementsByClassName('btnfilter')];
	filterMenu.forEach((filterBtn) => {
		filterBtn.addEventListener('click', (event) => {
			document.querySelector('.thumb-section').innerHTML = ' ';
			document.querySelector('.resume_like_price').innerHTML = ' ';
			// Filter sort-by menu function
			let mediaSorted = [];
			if (event.target.innerText === 'Popularité') {
				mediaSorted = media.sort((a, b) => b.likes - a.likes);
			} else if (event.target.innerText === 'Date') {
				mediaSorted = media.sort(
					(a, b) => new Date(b.date) - new Date(a.date)
				);
			} else if (event.target.innerText === 'Nom') {
				mediaSorted = media.sort((a, b) =>
					(a.video || a.image).localeCompare(b.image || b.video)
				);
			}
			createGallery(mediaSorted);
			lightBoxShow(media);
			totalLike(mediaSorted, photographers);
		});
	});
}
// NOTE // * LIGHTBOX FUNCTION **** //
function lightBoxShow(media) {
	const lightbox = document.querySelector('.lightBox-container');
	lightbox.setAttribute('aria-label', 'image closeup view');
	const pictures = document.getElementsByClassName('pictures');
	const lightBoxBox = document.querySelector('.lightBox-modal');

	let namelight = media
		.filter((photo) => photo.photographerId == idPhotographer)
		.map((element) => {
			if (element.image) {
				return element.image;
			} else {
				return element.video;
			}
		});

	let arrayPictures = [...pictures];
	const lightboxregex = /(_)|(.jpg)/g;
	const lightboxregexVideo = /(_)|(.mp4)/g;

	arrayPictures.forEach((image) => {
		image.addEventListener('click', (e) => {
			acces(e);
			document
				.querySelector('.main-container')
				.setAttribute('tabindex', '-1');
		});
		image.addEventListener('keydown', (e) => {
			if (e.key == 'Enter') {
				acces(e);
				document
					.querySelector('.main-container')
					.setAttribute('tabindex', '-1');
				document.querySelector('.main-container').style.visibility =
					'hidden';
			}
		});
		function acces(e) {
			let img;
			let i = arrayPictures.indexOf(e.currentTarget);
			const lightboxPicName = document.createElement('p');
			const picNameBloc = document.createElement('div');
			picNameBloc.classList = 'pic-name-bloc';
			lightboxPicName.classList = 'lightbox-img-name';
			lightboxPicName.innerText = namelight[i];
			lightbox.appendChild(picNameBloc);
			picNameBloc.appendChild(lightboxPicName);

			if (e.target === document.querySelector('video')) {
				img = document.createElement('video');
				img.setAttribute('controls', '');
				img.setAttribute('aria-label', 'video');
				lightboxPicName.innerText = namelight[i].replace(
					lightboxregexVideo,
					' '
				);
				img.setAttribute(
					'alt',
					namelight[i].replace(lightboxregexVideo, ' ')
				);
			} else {
				img = document.createElement('img');
				lightboxPicName.innerText = namelight[i].replace(
					lightboxregex,
					' '
				);
				img.setAttribute(
					'alt',
					namelight[i].replace(lightboxregex, ' ')
				);
			}

			img.src = e.target.src;

			while (lightBoxBox.firstChild) {
				lightBoxBox.removeChild(lightBoxBox.firstChild);
			}
			lightBoxBox.appendChild(img);
			lightbox.style.display = 'block';

			// NOTE // * LIGHTBOX NAVIGATION **** /

			const next = document.querySelector('.navigation-next');
			next.setAttribute('tabindex', '1');
			const previous = document.querySelector('.navigation-back');
			next.setAttribute('tabindex', '1');
			previous.setAttribute('aria-label', 'Previous image');
			next.setAttribute('aria-label', 'Next image');

			function navNext() {
				if (i >= arrayPictures.length - 1) i = -1;
				i++;
				if (pictures[i].src.includes('mp4')) {
					lightBoxBox.innerHTML = ' ';
					img = document.createElement('video');
					img.setAttribute('controls', '');
					lightBoxBox.appendChild(img);
					img.setAttribute(
						'alt',
						namelight[i].replace(lightboxregexVideo, ' ')
					);
					lightboxPicName.innerText = namelight[i].replace(
						lightboxregexVideo,
						' '
					);
				} else {
					lightBoxBox.innerHTML = ' ';
					img = document.createElement('img');
					lightBoxBox.appendChild(img);
					img.setAttribute(
						'alt',
						namelight[i].replace(lightboxregex, ' ')
					);
					lightboxPicName.innerText = namelight[i].replace(
						lightboxregex,
						' '
					);
				}
				img.src = pictures[i].src;
			}
			next.addEventListener('click', navNext, false);
			window.addEventListener('keydown', (event) => {
				if (event.key === 'ArrowRight') {
					navNext();
				}
			});

			function navPrevious() {
				if (i <= 0) i = arrayPictures.length;
				i--;
				if (pictures[i].src.includes('mp4')) {
					lightBoxBox.innerHTML = ' ';
					img = document.createElement('video');
					img.setAttribute('controls', '');
					lightBoxBox.appendChild(img);
					img.setAttribute(
						'alt',
						namelight[i].replace(lightboxregexVideo, ' ')
					);
					lightboxPicName.innerText = namelight[i].replace(
						lightboxregexVideo,
						' '
					);
				} else {
					lightBoxBox.innerHTML = ' ';
					img = document.createElement('img');
					lightBoxBox.appendChild(img);
					img.setAttribute(
						'alt',
						namelight[i].replace(lightboxregex, ' ')
					);
					lightboxPicName.innerText = namelight[i].replace(
						lightboxregex,
						' '
					);
				}
				img.src = pictures[i].src;
			}
			previous.addEventListener('click', navPrevious, false);
			window.addEventListener('keydown', (event) => {
				if (event.key === 'ArrowLeft') {
					navPrevious();
				}
			});
		}
	});

	//
	//**CLOSE LIGHTBOX ON CLICK  */
	const closeLightBox = document.getElementById('close-lightbox');
	closeLightBox.setAttribute('tabindex', '1');
	closeLightBox.setAttribute('aria-label', 'close dialog');
	closeLightBox.addEventListener('click', () => {
		if (document.querySelector('.pic-name-bloc')) {
			lightbox.removeChild(document.querySelector('.pic-name-bloc'));
			document.querySelector('.main-container').style.visibility =
				'visible';
		}

		lightbox.style.display = 'none';
	});
}
// NOTE // SHOW CONTACT MODAL + CONSOLE FUNCTION **** //
function contactFunction(photographers) {
	const closeCrossButton = document.querySelector('#close');
	const userMessage = document.querySelector('#user_message');
	closeCrossButton.setAttribute('aria-label', 'Close Contact Form');
	const contactMeButton = document.querySelector('.contact-me');
	const contactModal = document.getElementById('modal');
	const mainContainer = document.querySelector('.main-container');
	const firstName = document.getElementById('prenom');
	const lastName = document.getElementById('nom');
	const email = document.getElementById('email');
	const sendButton = document.querySelector('.send');
	sendButton.setAttribute('aria-label', 'send');
	const inputField = document.querySelectorAll('input');
	// Show user input in console
	firstName.addEventListener('input', () => {});
	lastName.addEventListener('input', () => {});
	email.addEventListener('input', () => {});
	function sendCondition() {
		if (!lastName.value || !firstName.value || !email.value) {
			console.log('veuillez remplir tous les champs');
		} else {
			console.log(firstName.value);
			console.log(lastName.value);
			console.log(email.value);
			closeModal();
			inputField.forEach((input) => (input.value = ''));
		}
	}
	sendButton.addEventListener('click', () => {
		sendCondition();
	});
	sendButton.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			sendCondition(e);
		}
	});
	// SHOW MODAL ON "CONTACTER MOI" BUTTON + CLOSE MODAL ON CROSS CLICK ****//
	contactMeButton.addEventListener('click', showModal);
	function showModal() {
		contactModal.tabIndex = '0';
		firstName.tabIndex = '1';
		lastName.tabIndex = '1';
		email.tabIndex = '1';
		userMessage.tabIndex = '1';
		sendButton.tabIndex = '1';
		closeCrossButton.tabIndex = '2';
		contactModal.style.display = 'block';
		contactModal.style.opacity = '1';
		mainContainer.style.filter = 'blur(4px)';
		document
			.querySelector('.dropdown-open')
			.querySelectorAll('button')
			.forEach((element) => {
				element.tabIndex = '-1';
			});
	}
	closeCrossButton.addEventListener('click', closeModal);
	closeCrossButton.addEventListener('keydown', (e) => {
		if (e.key == 'Enter') {
			closeModal();
		}
		// CHANGE TABINDEX OF SORT-BY ELEMENT //
		document.querySelector('.sort-by').tabIndex = '-1';
	});
	function closeModal() {
		contactModal.style.display = 'none';
		mainContainer.style.filter = 'blur(0px)';
		document
			.querySelector('.dropdown-open')
			.querySelectorAll('button')
			.forEach((element) => {
				element.tabIndex = '0';
			});
	}
	// PLACE Photographer name and "contacter moi" on modal
	photographers
		.filter((photo) => photo.id.toString() === idPhotographer)
		.map((element) => {
			const contactName = document.createElement('h2');
			contactModal.appendChild(contactName);
			contactModal.insertBefore(contactName, contactModal.children[2]);
			contactName.innerText = element.name;
		});
}
