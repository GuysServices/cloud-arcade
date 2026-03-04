const games = [
    { title: "Minecraft 1.5", thumb: "https://geet.in.net/get/minecraft-15/splash.jpeg", url: "https://geet.in.net/get/minecraft-15/game.html" },
    { title: "Hextris", thumb: "https://hextris.io/images/logo.png", url: "https://hextris.io/" },
    { title: "Tetris JS", thumb: "https://via.placeholder.com/200/00adff/ffffff?text=Tetris", url: "https://chvin.github.io/react-tetris/" },
    { title: "Pacman", thumb: "https://via.placeholder.com/200/fcd000/000000?text=Pacman", url: "https://google.com/logos/2010/pacman10-i.html" },
    { title: "Flappy Bird", thumb: "https://via.placeholder.com/200/54c0c9/ffffff?text=Flappy", url: "https://flappybird.io/" }
];

const gameGrid = document.getElementById('gameGrid');
const modal = document.getElementById('gameModal');
const gameFrame = document.getElementById('gameFrame');
const closeBtn = document.querySelector('.close');

function maskTab() {
    document.title = "Google Drive - My Drive";
    const link = document.getElementById('favicon');
    if (link) link.href = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
}

function panic() {
    window.location.href = "https://classroom.google.com";
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") panic();
});

function displayGames(filter = "") {
    gameGrid.innerHTML = "";
    games.filter(g => g.title.toLowerCase().includes(filter.toLowerCase())).forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumb}" alt="${game.title}">
            <p><strong>${game.title}</strong></p>
            <button class="cloak-btn">Cloak Open</button>
        `;
        card.onclick = (e) => {
            if (e.target.classList.contains('cloak-btn')) {
                openInBlank(game.url);
                return;
            }
            gameFrame.src = game.url;
            modal.style.display = "block";
        };
        gameGrid.appendChild(card);
    });
}

function openInBlank(url) {
    const win = window.open();
    if (!win) return alert("Please allow pop-ups");
    win.document.body.style.margin = '0';
    const iframe = win.document.createElement('iframe');
    iframe.style = "border:none;width:100%;height:100vh;";
    iframe.src = url;
    win.document.body.appendChild(iframe);
}

document.getElementById('searchBar').addEventListener('input', (e) => displayGames(e.target.value));

closeBtn.onclick = () => { modal.style.display = "none"; gameFrame.src = ""; };

// Suggestion Logic
document.getElementById('suggestionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('suggestName').value;
    const url = document.getElementById('suggestUrl').value;
    window.location.href = `mailto:admin@example.com?subject=Game Suggestion&body=Name: ${name}, URL: ${url}`;
    document.getElementById('formStatus').innerText = "Redirecting to email...";
});

maskTab();
displayGames();