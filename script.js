
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

        if (!response.ok) {
            throw new Error("Tietojen hakeminen epäonnistui");
        }

        // Muutetaan vastaus JSON-muotoon
        const data = await response.json();

        // Tallennetaan joukkueet muuttujaan
        allTeams = data.standings;

        // Näytetään kaikki joukkueet
        displayTeams(allTeams);

    } catch (error) {
        console.error("API-virhe:", error);

        teamsContainer.textContent =
            "Joukkueiden lataaminen epäonnistui.";
    }
}

// Näytetään joukkueet verkkosivulla
function displayTeams(teams) {
    const teamsContainer = document.getElementById("teams");

    // Tyhjennetään vanhat joukkueet
    teamsContainer.innerHTML = "";

    // Tarkistetaan löytyikö joukkueita
    if (teams.length === 0) {
        teamsContainer.textContent = "Joukkueita ei löytynyt.";
        return;
    }

    // Käydään joukkueet yksitellen läpi
    teams.forEach(team => {

        // Luodaan uusi kortti
        const teamCard = document.createElement("div");
        teamCard.classList.add("team-card");

        // Luodaan joukkueen nimi
        const name = document.createElement("h3");
        name.textContent = team.teamName.default;

        // Luodaan pistetiedot
        const points = document.createElement("p");
        points.textContent = "Pisteet: " + team.points;

        const wins = document.createElement("p");
        wins.textContent = "Voitot: " + team.wins;

        const losses = document.createElement("p");
        losses.textContent = "Tappiot: " + team.losses;

        // Lisätään tiedot korttiin
        teamCard.appendChild(name);
        teamCard.appendChild(points);
        teamCard.appendChild(wins);
        teamCard.appendChild(losses);

        // Lisätään kortti sivulle
        teamsContainer.appendChild(teamCard);
    });
}

// Haetaan hakukenttä HTML-sivulta
const searchInput = document.getElementById("teamSearch");

// Lisätään hakukentälle tapahtumankäsittelijä
searchInput.addEventListener("input", function() {

    // Luetaan käyttäjän kirjoittama hakusana
    const searchText = searchInput.value.toLowerCase();

    // Suodatetaan joukkueet hakusanan perusteella
    const filteredTeams = allTeams.filter(team =>
        team.teamName.default.toLowerCase().includes(searchText)
    );

    // Näytetään hakua vastaavat joukkueet
    displayTeams(filteredTeams);
});

// Käynnistetään sovellus
getTeams();
