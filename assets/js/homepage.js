var userFormEl = document.getElementById("user-form");
var nameInputEl = document.getElementById("username");

var formSubmitHandler = function(event) {
    event.preventDefault()
    var username = nameInputEl.value.trim();
    
    if(username) {
        getUserRepos(username);
        nameInputEl.value="";
    } else {
        alert("Please enter a GitHub username");
    }
};
var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
userFormEl.addEventListener("submit", formSubmitHandler);