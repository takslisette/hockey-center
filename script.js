
/*
    Hockey Center
    NHL-joukkueiden seurantasovellus

    Sovellus hakee NHL-joukkueiden tiedot
    NHL API -rajapinnasta.
*/

// NHL API -rajapinnan osoite
const API_URL = "https://proxy.cors.dev/https://api-web.nhle.com/v1/standings/now";

// Tallennetaan kaikki joukkueet tähän muuttujaan
let allTeams = [];

// Haetaan joukkueiden tiedot API:sta
async function getTeams() {

    const teamsContainer = document.getElementById("teams");

    try {

        // Lähetetään AJAX-pyyntö NHL:n palvelimelle
        const response = await fetch(API_URL);

        // Tarkistetaan, onnistuiko pyyntö
        if (!response.ok) {
            throw new Error("Tietojen hakeminen epäonnistui");
        }

        // Muutetaan palvelimen vastaus JSON-muotoon
        const data = await response.json();

        // Tallennetaan joukkueet muuttujaan
        allTeams = data.standings;

        // Näytetään kaikki joukkueet
        displayTeams(allTeams);

    } catch (error) {

        // Tulostetaan virhe selaimen konsoliin
        console.error("API-virhe:", error);

        // Näytetään käyttäjälle virheilmoitus
        teamsContainer.textContent =
            "Joukkueiden lataaminen epäonnistui. Yritä myöhemmin uudelleen.";
    }
}


// Näytetään joukkueet verkkosivulla
function displayTeams(teams) {

    const teamsContainer = document.getElementById("teams");

    // Tyhjennetään vanhat joukkuekortit
    teamsContainer.innerHTML = "";

    // Tarkistetaan löytyikö joukkueita
    if (teams.length === 0) {

        teamsContainer.textContent =
            "Joukkueita ei löytynyt.";

        return;
    }

    // Käydään kaikki joukkueet yksitellen läpi
    teams.forEach(team => {

        // Luodaan joukkueelle oma kortti
        const teamCard = document.createElement("div");

        teamCard.classList.add("team-card");

        // Luodaan joukkueen logo
        const logo = document.createElement("img");

        logo.src = team.teamLogo;
        logo.alt = team.teamName.default + " logo";
        logo.classList.add("team-logo");

        // Luodaan joukkueen nimi
        const name = document.createElement("h3");

        name.textContent = team.teamName.default;

        // Luodaan joukkueen pistetiedot
        const points = document.createElement("p");

        points.textContent =
            "Pisteet: " + team.points;

        // Luodaan voittojen määrä
        const wins = document.createElement("p");

        wins.textContent =
            "Voitot: " + team.wins;

        // Luodaan tappioiden määrä
        const losses = document.createElement("p");

        losses.textContent =
            "Tappiot: " + team.losses;

        // Lisätään kaikki tiedot joukkuekorttiin
        teamCard.appendChild(logo);
        teamCard.appendChild(name);
        teamCard.appendChild(points);
        teamCard.appendChild(wins);
        teamCard.appendChild(losses);

        // Lisätään valmis kortti verkkosivulle
        teamsContainer.appendChild(teamCard);

    });
}


// Haetaan hakukenttä HTML-sivulta
const searchInput = document.getElementById("teamSearch");

// Lisätään hakukentälle tapahtumankäsittelijä
searchInput.addEventListener("input", function() {

    // Luetaan käyttäjän kirjoittama hakusana
    const searchText = searchInput.value.toLowerCase();

    // Etsitään hakusanaa vastaavat joukkueet
    const filteredTeams = allTeams.filter(team =>

        team.teamName.default
            .toLowerCase()
            .includes(searchText)

    );

    // Näytetään hakua vastaavat joukkueet
    displayTeams(filteredTeams);

});


// Käynnistetään NHL-joukkueiden haku
getTeams();


// NHL:n tämän päivän otteluiden API-osoite
const GAMES_API_URL = "https://proxy.cors.dev/https://api-web.nhle.com/v1/score/now";

// Haetaan tämän päivän ottelut
async function getGames() {

    const gamesContainer = document.getElementById("games");

    try {

        // Haetaan ottelut NHL:n API:sta
        const response = await fetch(GAMES_API_URL);

        if (!response.ok) {
            throw new Error("Otteluiden hakeminen epäonnistui");
        }

        // Muutetaan vastaus JSON-muotoon
        const data = await response.json();

        // Näytetään ottelut sivulla
        displayGames(data.games);

    } catch (error) {

        console.error("Otteluvirhe:", error);

        gamesContainer.textContent =
            "Otteluiden lataaminen epäonnistui.";
    }
}


// Näytetään ottelut verkkosivulla
function displayGames(games) {

    const gamesContainer = document.getElementById("games");

    gamesContainer.innerHTML = "";

    if (!games || games.length === 0) {

        gamesContainer.textContent =
            "Tänään ei ole NHL-otteluita.";

        return;
    }

    games.forEach(game => {

        const gameCard = document.createElement("div");

        gameCard.classList.add("team-card");

        const homeTeam = document.createElement("h3");
        homeTeam.textContent =
            game.homeTeam.abbrev + " " + game.homeTeam.score;

        const awayTeam = document.createElement("h3");
        awayTeam.textContent =
            game.awayTeam.abbrev + " " + game.awayTeam.score;

        const status = document.createElement("p");
        status.textContent = game.gameState;

        gameCard.appendChild(homeTeam);
        gameCard.appendChild(awayTeam);
        gameCard.appendChild(status);

        gamesContainer.appendChild(gameCard);

    });
}


// Käynnistetään otteluiden haku
getGames();
