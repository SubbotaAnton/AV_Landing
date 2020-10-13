const checkboxes = document.getElementsByClassName('questionCheckbox');

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', onCheckBoxClick, false);
}

function onCheckBoxClick(event) {
    const isChecked = event.target.checked;
    let node = event.target;
    while (node && !node.classList.contains('option')) {
        node = node.parentNode;
    }
    if (isChecked) {
        node.classList.add('optionChecked');
    } else {
        node.classList.remove('optionChecked');
    }
}

const options = document.getElementsByClassName('option');

for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', onOptionClick, false);
}

function onOptionClick(event) {
    if (event.target.classList.contains('option')) {
        event.preventDefault();
        event.target.querySelectorAll('input[type="checkbox"]')[0].click();
    }
}
