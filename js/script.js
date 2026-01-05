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
    Birthday:[
        {name:"Balloon Decor", img:"images/Display  Pics/Balloon Flowers Mix Decor.jfif", price:"$20"},
        {name:"Cartoon Theme Decor", img:"images/Display  Pics/Cartoon Theme Decor.jfif", price:"$18"},
        {name:"Forest Theme Decor", img:"images/Display  Pics/Forest Theme Decor.jfif", price:"$25"},
    ],
    Mehndi:[
        {name:"Mehndi Stage Decor", img:"images/Display  Pics/Mehndi Stage Decor.jfif", price:"$30"},
        {name:"Mehndi Doli Decor", img:"images/Display  Pics/Mehndi Doli Decor.jfif", price:"$28"},
        {name:"Mehndi Venue Decor", img:"images/Display  Pics/Mehndi Venue Decor.jfif", price:"$35"}
    ],
    Events:[
        {name:"Wedding Decor", img:"images/Display  Pics/Wedding Decor.jfif", price:"$40"},
        {name:"Nikkah Decor", img:"images/Display  Pics/Nikkah Decor.jfif", price:"$45"},
        {name:"Valima Decor ", img:"images/Display  Pics/Valima Decor.jfif", price:"$50"}
    ],

    Rose:[
        {name:"Red Roses Bouquet", img:"images/Bouqet/Red Rose Bouquet.jfif", price:"$20"},
        {name:"White Roses Bouquet", img:"images/Bouqet/White Rose Bouquet.jfif", price:"$22"},
        {name:"Mix Roses Bouquet", img:"images/Bouqet/Mix Roses Bouquet.jfif", price:"$25"}
    ],
    lily:[
        {name:"White Lilies Bouquet", img:"images/Bouqet/White Lily Bouquet.jfif", price:"$18"},
        {name:"Pink Lilies Bouquet", img:"images/Bouqet/Pink  Lily Bouquet.jfif", price:"$20"},
        {name:"Mix Lilies Bouquet", img:"images/Bouqet/Mix Lily Bouquet.jfif", price:"$22"}
    ],
    Sunflower:[
        {name:"Sunflower Bouquet", img:"images/Bouqet/Sunflower Bouquet.jfif ", price:"$25"},
        {name:"Sunflower Rose Mix Bouquet", img:"images/Bouqet/Sunflower & White Rose Bouquet.jfif", price:"$27"},
        {name:"Sunflower Arrangment", img:"images/Bouqet/Sunflower Arrangement.jfif", price:"$30"}
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