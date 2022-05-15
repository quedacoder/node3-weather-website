// Get HTML elements my name
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
const messageThree = document.querySelector("#message-three");
const messageFour = document.querySelector("#message-four");

// add event listerner
weatherForm.addEventListener("submit", (e) => {
    // stops the browser from reloading
    e.preventDefault();

    // get the value typed into the form
    const location = search.value;

    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";
    messageThree.textContent = "";
    messageFour.textContent = "";

    // Calling api using fetch module
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                search.value = "";
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.message.forecast;
                messageThree.textContent = data.message.cloudcover;
                messageFour.textContent = data.message.visibility;
                search.value = "";
            }
        });
    });
});