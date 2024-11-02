document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("results");

    fetch("https://ergast.com/api/f1/2024/results.json")
        .then(response => response.json())
        .then(data => {
            const races = data.MRData.RaceTable.Races;
            races.forEach(race => {
                // Card for each race
                const card = document.createElement("div");
                card.classList.add("card");

                // Header
                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.innerHTML = `
                    <h5 class="card-title">${race.raceName}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Race ${race.round}</h6>
                `;

                const listGroup = document.createElement("ul");
                listGroup.classList.add("list-group", "list-group-flush");

                // Positions 0 to 10 (exclusive)
                race.Results.slice(0, 10).forEach((result, index) => {
                    const listItem = document.createElement("li");
                    listItem.classList.add("list-group-item");

                    // Podium colours
                    if (index === 0) {
                        listItem.classList.add("position-1");
                    } else if (index === 1) {
                        listItem.classList.add("position-2");
                    } else if (index === 2) {
                        listItem.classList.add("position-3");
                    }

                    // Set text with position and driver info
                    listItem.innerText = `${result.position}. ${result.Driver.givenName} ${result.Driver.familyName} (${result.Constructor.name})`;
                    listGroup.appendChild(listItem);
                });

                // Append
                cardBody.appendChild(listGroup);
                card.appendChild(cardBody);
                resultsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching race data:", error));
});
