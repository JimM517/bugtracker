document.getElementById('issueInputForm').addEventListener('submit', postIssue);

function postIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueImportance = document.getElementById('issueImportanceInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueOperatingSystem = document.getElementById('issueOperatingSystemInput').value;
    let issueEmail = document.getElementById('issueEmailInput').value;
    let issueId = chance.guid(); //generate global unit ID from chance library//
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        importance: issueImportance,
        assignedTo: issueAssignedTo,
        operatingSystem: issueOperatingSystem,
        issueEmail: issueEmail,
        status: issueStatus,
    }

    if (localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();
    
    //prevent form from submitting//
    e.preventDefault();

}

function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1); //at index i remove 1 element//
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}



/*document.getElementById('issueInput').addEventListener('submit', saveIssue)
    functiion saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueImportance = document.getElementById('importanceInput').value;
    let issueAssignedTo = document.getElementById('assignedToInput').value;
    let operatingSystem = document.getElementById('operatingSystemInput').value;
    //use chance to set global unit identifier//
    let issueId = chance.guid();
    let issueStatus = 'Open';
    

    const issue = {
        id: issueId,
        description: issueDesc,
        importance: issueImportance,
        operatingSystem: operatingSystem,
        assignedTo: issueAssignedTo,
        status: issueStatus,
    }
    

    if (localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    } else {
        let issues = issues.JSON.parse(localStorage.getItem('issues'))
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInput').reset();

    fetchIssue();

    e.preventDefault();
} */


function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList')

    issuesList.innerHTML = '';
    
    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let importance = issues[i].importance;
        let assignedTo = issues[i].assignedTo;
        let operatingSystem = issues[i].operatingSystem;
        let issueEmail = issues[i].issueEmail;
        let status = issues[i].status;

        issuesList.innerHTML += `<div class="jumbotron">
                                <h6>Issue ID: ${id}<h6>
                                <p><span class="label label-info">${status}<span></p>
                                <p>${desc}</p>
                                <p><span class="glyphicon glyphicon-time"></span>${importance}</p>
                                <p><span class="glyphicon glyphicon-user"></span>${assignedTo}</p>
                                <p>${operatingSystem}</p>
                                <p>${issueEmail}</p>
                                <a onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                                <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                                </div>`;
    }

}
    /*
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let importance = issues[i].importance;
        let assignedTo = issues[i].assignedTo;
        let operatingSystem = issues[i].operatingSystem;
        let status = issues[i].status;

        issuesList.innerHTML +=  `<div class="jumbotron">
                                <h6>Issue ID: ${id}<h6>
                                <p><span class="label label-info">${status}<span></p>
                                <h3>${desc}</h3>
                                <p><span class="glyphicon glyphicon-time"></span>${importance}</p>
                                <p><span class="glyphicon glyphicon-user"></span>${assignedTo}</p>
                                <h3>${operatingSystem}</h3>
                                <a href="#" onclick="statusClosed(${id}) class="btn btn-warning">Close</a>
                                <a href="#" onclick="delete(${id})class="btn btn-danger">Delete</a>
                                </div>`


    };
}; */