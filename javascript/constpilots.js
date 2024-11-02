async function fetchPilots() {
    try {
        const response = await fetch('https://ergast.com/api/f1/2024/drivers.json');
        const data = await response.json();
        const pilots = data.MRData.DriverTable.Drivers;

        displayPilots(pilots);
    } catch (error) {
        console.error('Error fetching pilot data:', error);
    }
}

function displayPilots(pilots) {
    const pilotList = document.getElementById('pilot-list');

    pilots.forEach(pilot => {
        const birthDate = new Date(pilot.dateOfBirth);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const pilotCard = document.createElement('div');
        pilotCard.className = 'card col-12 col-md-6 col-lg-4';
        pilotCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${pilot.givenName} ${pilot.familyName}</h5>
                <p class="card-text">Age: ${age}</p>
                <p class="card-text">Nationality: ${pilot.nationality}</p>
            </div>
        `;
        pilotList.appendChild(pilotCard);
    });
}

/*<img src="${pilot.url}" alt="${pilot.familyName}" class="card-img-top">*/

document.addEventListener('DOMContentLoaded', fetchPilots);