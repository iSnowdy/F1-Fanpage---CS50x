document.addEventListener("DOMContentLoaded", () => {
    const standingsContainer = document.getElementById("standings");

    fetch("https://api.jolpi.ca/ergast/f1/2024/constructorstandings/?format=json")
        .then(response => response.json())
        .then(data => {
            const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            standings.forEach((constructor, index) => {
                
                const card = document.createElement("div");
                card.classList.add("card");

                
                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.innerHTML = `
                    <h5 class="card-title">${constructor.Constructor.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Position ${constructor.position}</h6>
                `;

                if (constructor.position === "1") {
                    cardBody.classList.add("position-1");
                } else if (constructor.position === "2") {
                    cardBody.classList.add("position-2");
                } else if (constructor.position === "3") {
                    cardBody.classList.add("position-3");
                }

                const listItem = document.createElement("p");
                listItem.classList.add("card-text");

                // Points and nationality for the constructors
                listItem.innerText = `Points: ${constructor.points} | Nationality: ${constructor.Constructor.nationality}`;
                cardBody.appendChild(listItem);

                // Append
                card.appendChild(cardBody);
                standingsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching constructor standings:", error));
});