/* === Slider === */
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index){
    slides.forEach((slide,i)=>slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide(){
    currentSlide = (currentSlide +1) % slides.length;
    showSlide(currentSlide);
}

if(slides.length>0){
    showSlide(currentSlide);
    setInterval(nextSlide,4000);
}

/* === Categories Page / Flowers Page === */
const categoryDivs = document.querySelectorAll('.category-list div');
const productsContainer = document.getElementById('products');

const productsData = {
    birthday: [
        {name: "Birthday Red Roses", img: "images/product1.jpg"},
        {name: "Birthday Mixed Flowers", img: "images/product2.jpg"},
        {name: "Birthday Lily Bouquet", img: "images/product3.jpg"}
    ],
    anniversary: [
        {name: "Anniversary Roses", img: "images/product4.jpg"},
        {name: "Anniversary Lilies", img: "images/product5.jpg"},
        {name: "Anniversary Orchid", img: "images/product6.jpg"}
    ],
    wedding: [
        {name: "Wedding Rose Bouquet", img: "images/product7.jpg"},
        {name: "Wedding White Lilies", img: "images/product8.jpg"},
        {name: "Wedding Orchids", img: "images/product9.jpg"}
    ],
    getwell: [
        {name: "Get Well Soon Roses", img: "images/product10.jpg"},
        {name: "Get Well Soon Tulips", img: "images/product11.jpg"},
        {name: "Get Well Soon Lilies", img: "images/product12.jpg"}
    ]
};

categoryDivs.forEach(div => {
    div.addEventListener('click', () => {
        const cat = div.getAttribute('data-category') || div.getAttribute('data-flower');
        showProducts(cat);
    });
});

function showProducts(category){
    if(!productsContainer) return;
    productsContainer.innerHTML = '';
    if(!productsData[category]) return;
    productsData[category].forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}">
            <h4>${prod.name}</h4>
            <button>Add to Bucket</button>
        `;
        productsContainer.appendChild(card);
    });
}
