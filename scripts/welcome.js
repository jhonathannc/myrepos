input = document.getElementsByTagName('input')[0]
input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        searchUser()
    }
})

function searchUser() {
    const githubUserID = input.value
    if (githubUserID) {
        axios.get('https://api.github.com/users/' + githubUserID)
            .then(() => {
                localStorage.setItem('githubUserID', githubUserID)
                window.location.href = '/index.html'
            })
            .catch(() => alert('Usuario não encontrado D:'))
    } else {
        alert('Ops.. Insira um usuario.')
    }


}