
// NHL API -rajapinnan osoite
const API_URL = "https://api-web.nhle.com/v1/standings/now";

// Haetaan NHL-joukkueiden tiedot API:sta
async function getTeams() {
    const teamsContainer = document.getElementById("teams");

    try {
        // Lähetetään pyyntö NHL:n palvelimelle
        const response = await fetch(API_URL);

        // Tarkistetaan, onnistuiko pyyntö
        if (!response.ok) {
            throw new Error("Tietojen hakeminen epäonnistui");
        }

        // Muutetaan vastaus JSON-muotoon
        const data = await response.json();

        // Tallennetaan joukkueiden tiedot muuttujaan
        const teams = data.standings;

        // Tyhjennetään latausteksti
        teamsContainer.innerHTML = "";

        // Käydään kaikki joukkueet läpi
        teams.forEach(team => {

            // Luodaan joukkueelle oma kortti
            const teamCard = document.createElement("div");
            teamCard.classList.add("team-card");

            // Haetaan joukkueen nimi
            const teamName = team.teamName.default;

            // Lisätään joukkueen tiedot korttiin
            teamCard.innerHTML = `
                <h3>${teamName}</h3>
                <p>Pisteet: ${team.points}</p>
                <p>Voitot: ${team.wins}</p>
                <p>Tappiot: ${team.losses}</p>
            `;

            // Lisätään kortti verkkosivulle
            teamsContainer.appendChild(teamCard);
        });

    } catch (error) {
        // Näytetään virheilmoitus, jos haku epäonnistuu
        console.error("API-virhe:", error);

        teamsContainer.textContent =
            "Joukkueiden lataaminen epäonnistui. Yritä myöhemmin uudelleen.";
    }
}

// Käynnistetään joukkueiden haku
getTeams();
