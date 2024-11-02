async function fetchRaces() {
    try {
        const response = await fetch('https://ergast.com/api/f1/current.json');
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;

        displayRaces(races);
    } catch (error) {
        console.error('Error fetching race data:', error);
    }
}

function displayRaces(races) {
    const raceContainer = document.getElementById('race-list');
    raceContainer.innerHTML = '';

    const today = new Date(); // currdate

    races.forEach(race => {
        const raceDate = new Date(race.date); // Converts it to Object to compare
        const isFutureRace = raceDate > today; // Checks if the race has not taken place

        const raceEntry = document.createElement('div');
        raceEntry.className = 'race-entry';
        if (isFutureRace) {
            raceEntry.classList.add('future-race'); // Adds the CSS selector
        }
        raceEntry.innerHTML = `
            <h3>${race.raceName} - ${race.date}</h3>
            <p>Location: ${race.Circuit.circuitName}, ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</p>
            <a href="${race.url}" target="_blank" class="btn btn-primary">More Info</a>
        `;
        raceContainer.appendChild(raceEntry);
    });
}

document.addEventListener('DOMContentLoaded', fetchRaces);