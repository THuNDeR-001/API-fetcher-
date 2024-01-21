function fetchUserData() {
    const username = document.getElementById('username').value;
    const resultContainer = document.getElementById('result-container');

    // Clear previous results
    resultContainer.innerHTML = '';

    if (username) {
        // Fetch user data from GitHub API
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Not Found') {
                    resultContainer.innerHTML = '<p>User not found</p>';
                } else {
                    const userHtml = `
                        <img src="${data.avatar_url}" alt="${data.login}" style="border-radius: 50%; width: 100px; height: 100px;">
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Username:</strong> ${data.login}</p>
                        <p><strong>Followers:</strong> ${data.followers}</p>
                        <p><strong>Following:</strong> ${data.following}</p>
                        <p><strong>Public Repositories:</strong> ${data.public_repos}</p>
                        <p><strong>Profile URL:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
                    `;
                    resultContainer.innerHTML = userHtml;
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                resultContainer.innerHTML = '<p>Error fetching user data</p>';
            });
    } else {
        resultContainer.innerHTML = '<p>Please enter a username</p>';
    }
}
