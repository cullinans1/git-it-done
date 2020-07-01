var userFormEl = document.getElementById("user-form");
var nameInputEl = document.getElementById("username");
var repoContainerEl = document.getElementById("repos-container");
var repoSearchTerm = document.getElementById("repo-search-term");

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
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                dislayRepos(data, user);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub :(");
        });
};
var dislayRepos = function(repos, searchTerm) {
    //clear out old content 
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    if (repos.length === 0 ) {
        repoContainerEl.textContent = "No repositories found with that username.";
        return;
    }
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName
        repoEl.appendChild(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count === 1) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue";
        } 
        else if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>" + repos[i].open_issues_count + " issues";
        }
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}
userFormEl.addEventListener("submit", formSubmitHandler);