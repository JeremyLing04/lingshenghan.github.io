let lastScroll = window.scrollY;
var backTopBtn = document.getElementById('back-to-top');
var worldCuisine = document.querySelector(".world-cuisines");
var dropDownMenu = document.querySelector('.drop-down-menu');

// Check if user has already signed in
var isSignedIn = localStorage.getItem('isSignedIn');
if(isSignedIn){
    const username = JSON.parse(localStorage.getItem(localStorage.getItem("isSignedIn"))).name;
    account.innerHTML = "<span>"+ username + "</span>";
}

window.addEventListener('scroll', () => {
    if(window.scrollY > 140 && lastScroll < window.scrollY){
        document.querySelector('.sticky-header').classList.add('hidden');
    } else {
        document.querySelector('.sticky-header').classList.remove('hidden');
    }
    lastScroll = window.scrollY;

    if(window.scrollY > 140){
        backTopBtn.style.display = 'block';
    }else{
        backTopBtn.style.display = 'none';
    }
});

backTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


worldCuisine.addEventListener('click', (event) => {
    event.stopPropagation();
    if(dropDownMenu.style.display=='block'){
        worldCuisine.querySelector('.fa-solid').classList.replace('fa-angle-up', 'fa-angle-down');
        dropDownMenu.style.display = 'none';
    }else{
        worldCuisine.querySelector('.fa-solid').classList.replace('fa-angle-down', 'fa-angle-up');
        dropDownMenu.style.display = 'block';
    }

});

window.addEventListener('click', () => {
    if(dropDownMenu.style.display=='block'){
        worldCuisine.querySelector('.fa-solid').classList.replace('fa-angle-up', 'fa-angle-down');
        dropDownMenu.style.display = 'none';
    }
});