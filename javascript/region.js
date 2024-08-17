//Select all filter buttons and filterable food gallery
const filterButtons = document.querySelectorAll(".food-filter button");
const filterableFood = document.querySelectorAll(".food-gallery .food-item");

//Define the filterFood function
const filterFood = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    //Iterate over each food item
    filterableFood.forEach(food => {
        //Add "hide" class to hide the food initially
        food.classList.add("hide");
        //Check if the card matches the selected filter or "all" is selected
        if(food.dataset.name === e.target.dataset.name || e.target.dataset.name === "all"){
            food.classList.remove("hide");
        }
    });
};

filterButtons.forEach(button => button.addEventListener("click", filterFood));