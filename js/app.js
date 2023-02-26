const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = "";
    // display no phones

    const noPhones = document.getElementById('no-phones-msg');
    if (phones.length == 0) {
        noPhones.classList.remove('d-none')
    }
    else {
        noPhones.classList.add('d-none')
    }
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {

        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="col">
						<div class="card p-4">
							<img src="${phone.image}" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">${phone.phone_name}</h5>
								<p class="card-text">
									This is a longer card with supporting text below as a natural
									lead-in to additional content. This content is a little bit
									longer.
								</p>
                                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#phoneDetailModal">show Details</button>
							</div>
						</div>
					</div>
        `;
        phonesContainer.appendChild(phoneDiv)

    });
    // stop loader
    toggleLoader(false)

}
const processSearch = (dataLimit) => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
    searchField.value = "";

}
// handle search btn click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);

});
// search input field enter key handler 
document.getElementById('search-field').addEventListener('keypress', function (enter) {
    if (enter.key === 'Enter') {
        processSearch(10);
    }
})


const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none')
    }
}
// not the best way to show all info
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

// load phone details info
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

// display phone details
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p> Release Date ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
    <p>${phone.mainFeatures ? phone.mainFeatures.storage : 'no information found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'}</p>
    
    `
}
loadPhone('apple');