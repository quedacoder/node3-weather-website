// Get HTML elements my name
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

// add event listerner
weatherForm.addEventListener("submit", (e) => {
    // stops the browser from reloading
    e.preventDefault();

    // get the value typed into the form
    const location = search.value;

    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";

    // Calling api using fetch module
    fetch("http://localhost:3000/weather?address=" + location).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                    search.value = "";
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.message.forecast;
                    search.value = "";
                }
            });
        }
    );
});