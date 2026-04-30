// Grab references to the input field and the list <ul> (or <ol>) where tasks will appear.
const inputBox = document.getElementById("input-box"); // to get input box from id
const listContainer = document.getElementById("list-container");

// Called when the user adds a new task (likely wired to a button onclick or Enter key).
function addTask() { // function to add new task in toodo
    // If the input is empty, warn the user and do nothing else.
    if (inputBox.value === '') {
        alert("you must write something ! ");
    } else {
        // Create a new <li> element to hold the task text.
        let li = document.createElement("li");
        // Put the user's typed text inside the <li>.
        li.innerHTML = inputBox.value;
        // Add the <li> to the list container in the DOM so it appears on the page.
        listContainer.appendChild(li);

        // Create a <span> that will act as a delete ("×") button.
        let span = document.createElement("span");
        // Unicode multiplication sign "×" (U+00D7) for the delete icon.
        span.innerHTML = "\u00d7";
        // Place the <span> inside the <li> so it shows next to the task text.
        li.appendChild(span);
    }

    // Clear the input box so the user can type another task.
    inputBox.value = '';
    // Save the current list HTML to localStorage so tasks persist on reload.
    saveData(); // to save the current list in localstorage
}

// Event delegation: listen for clicks anywhere inside the list container.
listContainer.addEventListener("click", function(e) {
    // If a user clicks directly on an <li>, toggle its "checked" state (complete/incomplete).
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    // If the user clicks the delete <span> ("×"), remove that task's <li>.
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Persist current list markup into localStorage under the key "data".
function saveData() { // add function to save data after additon
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load saved tasks from localStorage at page load (or when called).
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Immediately load any previously saved tasks when the script runs.
showTask();
