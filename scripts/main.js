p = document.getElementsByTagName('p')
nameHeader = p[1]
totalRepo = p[p.length - 2]
avatar = document.getElementsByTagName('img')[0]
uid = localStorage.getItem('githubUserID')

function getUserDataFromID() {
    return axios.get('https://api.github.com/users/' + uid)
        .then((res) => {
            return res.data
        })
        .catch((err) => { return 'Usuario não encontrado D:' })
}

function getUserReposFromID() {
    return axios.get('https://api.github.com/users/' + uid + '/repos')
        .then((res) => {
            return res.data
        })
        .catch((err) => { return 'Nenhum repositorio encontrado D:' })
}

function capitalize(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

function changeUser() {
    localStorage.removeItem('githubUserID')
    window.location.href = '/welcome.html'
}

if (uid) {
    getUserDataFromID().then(res => {
        nameHeader.innerHTML = res.login
        totalRepo.innerHTML = res.public_repos
        avatar.src = res.avatar_url

        getUserReposFromID().then(repos => {
            repos.forEach(repo => {

                // <div class="list">
                //     <ul>
                //         <li>
                //             <label>
                //                 <a></a>
                //                 <p>Repo Name</p>
                //             </label>
                //         </li>
                //     </ul>
                // </div>

                divRepos = document.getElementsByClassName('div')
                ulRepos = document.getElementsByTagName('ul')[0]
                li = document.createElement('li')
                label = document.createElement('label')
                a = document.createElement('a')
                p = document.createElement('p')

                p.textContent = repo.name

                label.appendChild(a)
                label.appendChild(p)
                li.appendChild(label)
                ulRepos.appendChild(li)
            });
        })
    })
} else
    window.location.href = '/welcome.html'