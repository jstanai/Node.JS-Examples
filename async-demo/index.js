// Syncronous or blocking
console.log('Before');
console.log('After');

// Asyncronoous
// console.log('Before');
// getUser(1, getRepositories);

// console.log('After');

// function getRepositories(user){
//     getRepositories(user.gitHubUsername, getCommits);
// };

// function getCommits(repos) {
//     getCommits(repo, displayCommits);
// };

// function displayCommits(commits) {
//     console.log(commits);
// };

// Ways of getting results from asynchronous operations
// Callbacks
// Promises
// Async/await

getUser(1)
    .then(user => getRepositories(user.gitHubUsername));
    

function getUser(id) {

    return new Promise((resolve, reject) => {
        //kick off asyn work

        setTimeout(() => {
            console.log('Reading a user from DB');
            resolve({id: id, gitHubUsername: 'jared'})
        }, 2000);
    });

    
};

function getRepositories(username) {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading github api repos');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);

    });
    
};

function getCommits(repo) {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading commit');
            resolve(['commit']);
        }, 2000);

    });
    
};