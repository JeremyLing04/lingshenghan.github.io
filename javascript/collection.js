//remove food from favorite
function removeFavorite(event, foodId) {
    var confirmation = confirm('Do you want to Remove this food?');
    if(confirmation == true){
        //prevent jump to food page
        event.stopPropagation();
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(f => f.id !== foodId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }
}

//generate the url of food format: food-food.html
//exp: Roasted Chicken -> roasted-chicken.html
function generateFoodPageUrl(foodName) {
    return foodName.toLowerCase().replace(/ /g, '-') + '.html';
}

//jump to the food page
function goToFoodPage(food) {
    const url = generateFoodPageUrl(food.name);
    window.location.href = url;
}

//display the food
function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';
    
    //read the food from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    //Traverse the foods collection from local storage and create a element for food
    favorites.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');
        foodItem.dataset.name = food.region;

        foodItem.onclick = () => goToFoodPage(food);

        const img = document.createElement('img');
        img.classList.add('food-img');
        img.src = food.image;
        img.alt = food.name;

        const flag = document.createElement('span');
        flag.classList.add('flagIcon-countryName');

        const countryFlag = document.createElement('img');
        countryFlag.classList.add('flagIcon');
        countryFlag.src = food.flag;

        const name = document.createElement('p');
        name.textContent = food.name;

        //Create favorite button
        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favorite-btn', 'active');

        //defines a 24x24 viewport, origin = (0,0)
        //Use the path tag to draw a heart
        favoriteButton.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `;
        favoriteButton.onclick = (event) => removeFavorite(event, food.id);

        //Add all elements into food-item
        flag.appendChild(countryFlag);
        foodItem.appendChild(img);
        foodItem.appendChild(flag);
        foodItem.appendChild(name);
        foodItem.appendChild(favoriteButton);
        favoritesList.appendChild(foodItem);
    });

    //Monitors whether an element enters the viewport
    const observer = new IntersectionObserver((entries) => {

        //animation for the food-item (down -> up)
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); 
                observer.unobserve(entry.target);
            }
        });
    }, 
    {
        threshold: 0.1 
    });
    
    //Elements that enter the viewport at the same time will be displayed one by one
    const eventItems = document.querySelectorAll('.food-item');
    eventItems.forEach(item => {
        observer.observe(item);
    });
}

function filterByRegion(region) {
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        if (region === 'all' || item.dataset.name === region) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderFavorites();
    const filterButtons = document.querySelectorAll('.food-filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const region = this.dataset.region;
            filterByRegion(region);

            document.querySelector(".active").classList.remove("active");
            button.classList.add("active");
        });
    });
});

document.addEventListener('DOMContentLoaded', renderFavorites);