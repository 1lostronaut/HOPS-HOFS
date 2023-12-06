const buttonComponent = (id, text) => `<button id="${id}">${text}</button>`;

const beerTypeComponent = list => list.map(tag => `<li>${tag}</li>`);

const beerComponent = ({brewery, name, type, score, abv}) => `
	<div class="beer">
		<h2>${name}</h2>
		<h3>${brewery}</h3>
		<ul>${beerTypeComponent(type)}</ul>
		<h4>${score}</h4>
		<h5>${abv}</h5>
	</div
`;

const winnerComponent = (beer) => `
	<div id="winner">
		<h1>The best light Ale is</h1>
		${beerComponent(beer)}
  </div>
		${buttonComponent("closeWinner", "Close")}
`;

let sortButtonClickCounter = 0;

const loadEvent = _ => {

	const rootElement = document.getElementById("root");
	rootElement.insertAdjacentHTML("afterbegin", buttonComponent("loadBeers", "Load the beers"));
  
	const clickEvent = event => {
    
    if (event.target.id === "loadBeers") {
      document.getElementById("loadBeers").remove();
      beers.map(beer => rootElement.insertAdjacentHTML("beforeend", beerComponent(beer)));
      rootElement.insertAdjacentHTML("afterbegin", buttonComponent("bestLightAle", "Best Light Ale"));
      rootElement.insertAdjacentHTML("afterbegin", buttonComponent("filterStrongIPAs", "Strong IPAs"));
      rootElement.insertAdjacentHTML("afterbegin", buttonComponent("sortByScore", "Sort by score"));
    } else if (event.target.id === "sortByScore") {
      [...document.querySelectorAll(".beer")].map(beer => beer.remove()); // --> MIÉRT KELL A "..." A DOCUMENT ELÉ? EZZEL LEMÁSOLOM A TARTALMAT, TEHÁT NEM AZ EREDETI ".beers" CLASSOKON ITERÁLOK, VAGYIS NEM AZT SZEDI KI A ()remove
      if (sortButtonClickCounter % 2 === 0) {
        console.log("leszedtem a beer classal ellátott tartalmat")
        const sortedBeersArra_b = beers.sort((a, b) => a.score - b.score);
        sortedBeersArra_b.map(sortedBeer => rootElement.insertAdjacentHTML("beforeend", beerComponent(sortedBeer)));
        console.log("hozzáadtam a söröket EMELKEDŐ score szerint")
        sortButtonClickCounter++
      } else if (sortButtonClickCounter % 2 === 1) {
        console.log("leszedtem a beer classal ellátott tartalmat")
        const sortedBeersArrb_a = beers.sort((a, b) => b.score - a.score);
        sortedBeersArrb_a.map(sortedBeer => rootElement.insertAdjacentHTML("beforeend", beerComponent(sortedBeer)));
        console.log("hozzáadtam a söröket CSÖKKENŐ score szerint")
        sortButtonClickCounter++
      }
    } else if (event.target.id === "filterStrongIPAs") {
      document.getElementById("filterStrongIPAs").remove();
      rootElement.insertAdjacentHTML("afterbegin", buttonComponent("resetFilter", "Reset filter"));
      [...document.querySelectorAll(".beer")].map(beer => beer.remove());
      let filteredBeers = beers.filter(beer => ((beer.type.includes("IPA")) && (beer.abv >= 6)))
      filteredBeers.map(beer => rootElement.insertAdjacentHTML("beforeend", beerComponent(beer)))
    } else if (event.target.id === "resetFilter") {
      document.getElementById("resetFilter").remove();
      [...document.querySelectorAll(".beer")].map(beer => beer.remove());
      if (sortButtonClickCounter % 2 === 0) {
        console.log("leszedtem a beer classal ellátott tartalmat")
        const sortedBeersArra_b = beers.sort((a, b) => a.score - b.score);
        sortedBeersArra_b.map(sortedBeer => rootElement.insertAdjacentHTML("beforeend", beerComponent(sortedBeer)));
        console.log("hozzáadtam a söröket EMELKEDŐ score szerint")
        sortButtonClickCounter++
      } else if (sortButtonClickCounter % 2 === 1) {
        console.log("leszedtem a beer classal ellátott tartalmat")
        const sortedBeersArrb_a = beers.sort((a, b) => b.score - a.score);
        sortedBeersArrb_a.map(sortedBeer => rootElement.insertAdjacentHTML("beforeend", beerComponent(sortedBeer)));
        console.log("hozzáadtam a söröket CSÖKKENŐ score szerint")
        sortButtonClickCounter++
      }
    } else if (event.target.id === "bestLightAle") {
      let filtered = beers.filter(beer => ((beer.type.includes("Ale")) && (beer.abv <= 6))) // lesz egy array, Ale típussal és max 6%-kal
      let sortedAle = filtered.sort((a, b) => b.score - a.score);
      [...document.querySelectorAll(".beer")].map(beer => beer.remove());
      document.getElementById("bestLightAle").remove();
      rootElement.insertAdjacentHTML("beforeend", winnerComponent(sortedAle[0]));
    } else if (event.target.id === "closeWinner") {
      document.getElementById("root").innerHTML = " ";
      rootElement.insertAdjacentHTML("afterbegin", buttonComponent("loadBeers", "Load the beers"));
    }
	}
	window.addEventListener("click", clickEvent);
}

// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener("load", loadEvent);
