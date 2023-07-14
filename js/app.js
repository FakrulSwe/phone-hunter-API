const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    }
    catch(error){
        console.log(error);
    }

}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById("phone-container");
    phonesContainer.textContent = '';
    // Display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 11){
        phones = phones.slice(0,11);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // Display no phones found
    const noPhones = document.getElementById('no-found-message');

    if(phones.length === 0){
        noPhones.classList.remove('d-none');
    }
    else{
        noPhones.classList.add('d-none');
    }

    // Display all phones
    phones.forEach(phones => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phones.image}" class="card-img-top p-5" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phones.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick = "loadPhoneDetails('${phones.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
    // start loader
    processSearch(11);
    
})

// Search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        processSearch(11);
    }
})

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

// call phone details API server
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayPhoneDetails(data.data);
        
    }
    catch(error){
        console.log(error);
    }
}

// Display phone Details
const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}</p>
        <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <h6>Main Features: </h6>
        <ul>Chip Set: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No Main Features Found'}</ul>
        <ul>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Main Features Found'}</ul>
        <ul>Chip Set: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Main Features Found'}</ul>
    `;

}

loadPhones(11);
