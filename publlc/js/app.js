const weatherForm = document.querySelector('#search-form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#p-1');
const messageTwo = document.querySelector('#p-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);

                messageOne.textContent = data.error;
            } else {
                console.log(data.address);
                console.log(data.location);
                console.log(data.forecast);

                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})
