// === Slider ===
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index){
    slides.forEach((slide,i)=>slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide(){
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 4000); // slider auto change

// === Categories & Flowers Data ===
const products = {
    birthday:[
        {name:"Red Roses", img:"images/flower1.jpg", price:"$20"},
        {name:"Tulip Bouquet", img:"images/flower2.jpg", price:"$18"},
        {name:"Lilies Set", img:"images/flower3.jpg", price:"$25"},
        {name:"Sunflowers", img:"images/flower4.jpg", price:"$22"}
    ],
    anniversary:[
        {name:"Orchid Arrangement", img:"images/flower5.jpg", price:"$30"},
        {name:"Romantic Roses", img:"images/flower6.jpg", price:"$28"},
        {name:"Mixed Flowers", img:"images/flower7.jpg", price:"$35"}
    ],
    wedding:[
        {name:"Wedding Bouquet 1", img:"images/flower8.jpg", price:"$40"},
        {name:"Wedding Bouquet 2", img:"images/flower9.jpg", price:"$45"},
        {name:"Wedding Arrangement", img:"images/flower10.jpg", price:"$50"}
    ],
    getwell:[
        {name:"Get Well Roses", img:"images/flower11.jpg", price:"$20"},
        {name:"Healing Lilies", img:"images/flower12.jpg", price:"$22"},
        {name:"Cheerful Sunflowers", img:"images/flower13.jpg", price:"$25"}
    ],
    rose:[
        {name:"Red Roses", img:"images/flower1.jpg", price:"$20"},
        {name:"Pink Roses", img:"images/flower2.jpg", price:"$22"},
        {name:"White Roses", img:"images/flower3.jpg", price:"$25"}
    ],
    lily:[
        {name:"White Lilies", img:"images/flower4.jpg", price:"$18"},
        {name:"Pink Lilies", img:"images/flower5.jpg", price:"$20"},
        {name:"Yellow Lilies", img:"images/flower6.jpg", price:"$22"}
    ],
    orchid:[
        {name:"Purple Orchid", img:"images/flower7.jpg", price:"$30"},
        {name:"White Orchid", img:"images/flower8.jpg", price:"$32"},
        {name:"Pink Orchid", img:"images/flower9.jpg", price:"$28"}
    ],
    sunflower:[
        {name:"Sunflower Bouquet", img:"images/flower10.jpg", price:"$25"},
        {name:"Sunflower Mixed", img:"images/flower11.jpg", price:"$27"},
        {name:"Sunflower Arrangement", img:"images/flower12.jpg", price:"$30"}
    ]
};

// === Render Products on Click ===
const categoryDivs = document.querySelectorAll('.category-list div');
const productSection = document.getElementById('products');

categoryDivs.forEach(div=>{
    div.addEventListener('click',()=>{
        let key = div.dataset.category || div.dataset.flower;
        renderProducts(key);
        // Scroll to products
        productSection.scrollIntoView({behavior:"smooth"});
    });
});

function renderProducts(category){
    if(!products[category]) return;
    productSection.innerHTML = ""; // clear previous
    products[category].slice(0,3).forEach(prod=>{
        const card = document.createElement('div');
        card.className = "product-card";
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}">
            <h4>${prod.name}</h4>
            <p style="text-align:center; font-weight:bold;">${prod.price}</p>
            <button>Add to Cart</button>
        `;
        productSection.appendChild(card);
    });
}

// === Account Dropdown ===
const userBtn = document.getElementById('userBtn');
const dropdown = document.querySelector('.dropdown-content');

userBtn.addEventListener('click',()=> dropdown.classList.toggle('show'));
window.addEventListener('click', e=>{
    if(!e.target.matches('#userBtn')) dropdown.classList.remove('show');
});

// === Google Map ===
function initMap() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
            const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            createMap(location);
        }, ()=>{
            createMap({ lat: 24.8607, lng: 67.0011 }); // Karachi fallback
        });
    }else{
        createMap({ lat: 24.8607, lng: 67.0011 });
    }
}

function createMap(location){
    const map = new google.maps.Map(document.getElementById("map"), { zoom:12, center:location });
    new google.maps.Marker({ position:location, map:map });
}
