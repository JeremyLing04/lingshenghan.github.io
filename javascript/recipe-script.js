document.querySelectorAll('.filter-parameters input').forEach((inputField) => {
    inputField.addEventListener('click', () => {
        document.querySelectorAll('.selection-container > div').forEach((selection) => {selection.style.display = 'none'});
        document.querySelector('.'+ inputField.id + '-selection').style.display = 'block';
    });
});

var items = Array.from(document.querySelectorAll('.food-item'));
document.querySelector('.filter-button').addEventListener('click', () => {
    document.querySelectorAll('.selection-container > div').forEach((selection) => {selection.style.display = 'none'});
    var sorting = document.querySelector('.sorting input').value;
    var category = document.querySelector('.category input').value.replace(' ', '-');
    var cookingTime = document.querySelector('.cooking-time input').value;
    
    var gallery = document.querySelector('.food-gallery');
    gallery.innerHTML = '';

    if(sorting == 'Best Rated') {
        items.sort((a, b) => {
            return parseFloat(a.getAttribute('data-rating')) - parseFloat(b.getAttribute('data-rating'));
        });
        items.reverse();
    }else if(sorting == 'Most Popular'){
        items.sort((a, b) => {
            return parseFloat(a.dataset.views) - parseFloat(b.dataset.views);
        });
        items.reverse();
    }else if(sorting == 'New'){
        items.sort((a, b) => {
            var date1 = parseDate(a.getAttribute('data-upload-date'));
            var date2 = parseDate(b.getAttribute('data-upload-date'));
            return date1 - date2;
        });
        items.reverse();
    }
    else if(sorting == 'Alphabetically'){
        items.sort((a,b) => {
            return a.querySelector('.flagIcon-foodName h2').innerText.trim().localeCompare(b.querySelector('.flagIcon-foodName h2').innerText.trim());
        });
    }

    items.forEach((item)=>{
        item.classList.remove('hide');
        if(category != '' && category != 'All'){
            if(!item.classList.contains(category)){
                item.classList.add('hide');
            }
        }

        if(cookingTime != '' && cookingTime != 'All'){
            if(item.getAttribute('data-cooking-time') != cookingTime){
                item.classList.add('hide');
            }
        }
        gallery.appendChild(item);
    });

});

function parseDate(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month-1, day);
}

document.querySelectorAll('.sorting-selection li').forEach(function(selection) {
    selection.addEventListener('click', () => {
        var input = document.querySelector('.sorting input');
        input.value = selection.innerHTML;
    });
});

document.querySelectorAll('.category-selection li').forEach(function(selection) {
    selection.addEventListener('click', () => {
        var input = document.querySelector('.category input');
        input.value = selection.innerHTML;
    });
});

document.querySelector('.cooking-time-selection input').addEventListener('input', (event) => {
    var input = document.querySelector('.cooking-time input');
    switch (event.target.value) {
        case '1':
            input.value = 'All';
            break;
        case '2':
            input.value = '15min';
            break;
        case '3':
            input.value = '30min';
            break;
        case '4':
            input.value = '45min';
            break;
        case '5':
            input.value = '1h';
            break;
        case '6':
            input.value = '2h';
            break;
        case '7':
            input.value = '3h';
            break;
        default:
            input.value = '>5h';
    }
});