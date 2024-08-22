const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                            <div class="data">
                                <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
                                <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
                                <div class="followers-and-following">
                                    <p>👥Seguidores: ${user.followers ?? "Não possui seguidores 😢"}</p>
                                    <p>👥Seguindo: ${user.following ?? "Não está seguindo ninguem 😢"}</p>
                                </div>
                            </div>
                         </div>`

        let repositoriesItens = "";
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                                                    <div class="info-repo">
                                                                        <p><span>🍴</span>${repo.forks_count}</p>
                                                                        <p><span>⭐</span>${repo.stargazers_count}</p>
                                                                        <p><span>👀</span>${repo.watchers_count}</p>
                                                                        <p><span>👨‍💻</span>${repo.language}</p>
                                                                    </div>
                                                                </li>`);
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>
                                                    ${repositoriesItens}
                                                </ul>   
                                            </div>`
        };
        let eventsItens = "";
        user.events.forEach((e) => {
            if (e.type === "CreateEvent") {
                eventsItens += `<li><span>${e.repo.name}</span> - Sem mensagem de commit</li>`
            } else {
                eventsItens += `<li><span>${e.repo.name}</span> - ${e.payload.commits[0].message}</li>`
            };
        });
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>
                                                    ${eventsItens}
                                                </ul>
                                            </div>`
        };
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };