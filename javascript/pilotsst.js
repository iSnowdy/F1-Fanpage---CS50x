document.addEventListener("DOMContentLoaded", () => {
    const driverStandingsContainer = document.getElementById("driver-standings");

    fetch("https://api.jolpi.ca/ergast/f1/2024/driverstandings/?format=json")
        .then(response => response.json())
        .then(data => {
            const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            standings.forEach((driver, index) => {
                
                const card = document.createElement("div");
                card.classList.add("card");

                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.innerHTML = `
                    <h5 class="card-title">${driver.Driver.givenName} ${driver.Driver.familyName}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Position ${driver.position}</h6>
                `;

                if (driver.position === "1") {
                    cardBody.classList.add("position-1");
                } else if (driver.position === "2") {
                    cardBody.classList.add("position-2");
                } else if (driver.position === "3") {
                    cardBody.classList.add("position-3");
                }

                // Position styling for top three
                const listItem = document.createElement("p");
                listItem.classList.add("card-text");

                // Driver information
                listItem.innerText = `Points: ${driver.points} | Nationality: ${driver.Driver.nationality} | Team: ${driver.Constructors[0].name}`;
                cardBody.appendChild(listItem);

                // Append
                card.appendChild(cardBody);
                driverStandingsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching driver standings:", error));
});