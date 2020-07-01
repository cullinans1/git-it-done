var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.getElementById('limit-warning');

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayIssues(data);

                // check if api has more than 30 issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo had no open issues!";
        return;
    }
    for( var i = 0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        //create span to hold the issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        //append to the container 
        issueEl.appendChild(titleEl);
        //create a type element
        var typeEl = document.createElement("span");
        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};
var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //apend to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");