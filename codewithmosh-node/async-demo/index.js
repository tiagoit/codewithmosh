console.log('Before');

// Promise based apporach
// getUser(1)
//     .then((user) => getGitHubRepos(user.gitHubUsername))
//     .then((repos) => getCommits(repos[0]));

// Async / Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getGitHubRepos(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch(err) {
        console.log('Error: ', err);
    }
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Read user from the database...')
            console.log({ id: 1, gitHubUsername: 'mosh' });
            resolve({ id: 1, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getGitHubRepos(gitHubUsername) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Read GitHub repos...`);
            console.log(['a', 'b', 'c']);
            resolve(['a', 'b', 'c']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Read repository commits...`);
            console.log(['8s79ad', '7ds6f8', 'd876sf']);
            resolve(['8s79ad', '7ds6f8', 'd876sf']);
        }, 2000);
    });
}