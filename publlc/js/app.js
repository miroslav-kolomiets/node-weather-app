const weatherForm = document.querySelector('#search-form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#p-1');
const messageTwo = document.querySelector('#p-2');
const summary = document.querySelector('#summary');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                summary.textContent = data.summary;
            }
        })
    })
})


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
