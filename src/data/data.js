const flightNumbers = [
  "AA123",
  "DL456",
  "UA789",
  "SW101",
  "FR202",
  "BA345",
  "LH678",
  "AF901",
  "EK123",
  "SQ456",
  "AI629",
  "IG724",
];

const statuses = ["On Time", "Delayed", "Cancelled", "Departed", "Landed"];
const gates = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "D4",
  "E5",
];
const from = "DEL";
const locations = [
  "BLR",
  "COK",
  "MAS",
  "TRV",
  "BOM",
  "GOI",
  "JFK",
  "FRV",
  "HLL",
  "CDP",
  "BRY",
  "CUR",
  "FRA",
  "HHN",
  "BVA",
  "PAR",
  "LON",
  "TYO",
  "HND",
  "OKO",
  "ICN",
  "SEL",
];
const Terminal = ["T1", "T2", "T3"];

function generateRandomTime() {
  const now = new Date();
  const hours = now.getHours() + Math.floor(Math.random() * 5);
  const minutes = Math.floor(Math.random() * 60);
  return new Date(now.setHours(hours, minutes)).toLocaleTimeString();
}

function generateRandomFlight(flightNumber) {
  return {
    flightNumber: flightNumber,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    gate: gates[Math.floor(Math.random() * gates.length)],
    departure: generateRandomTime(),
    arrival: generateRandomTime(),
    location: locations[Math.floor(Math.random() * locations.length)],
    from: from,
    terminal: Terminal[Math.floor(Math.random() * Terminal.length)],
  };
}

let flights = flightNumbers.map(generateRandomFlight);

function displayAllFlights() {
  return flights.map((flight) => {
    return {
      flightNo: flight.flightNumber,
      status: flight.status,
      gate: flight.gate,
      departure: flight.departure,
      arrival: flight.arrival,
      location: flight.location,
      from: flight.from,
      terminal: flight.terminal,
    };
  });
}

function generateMoreFlights(count) {
  const additionalFlights = [];
  for (let i = 0; i < count; i++) {
    let NEW = [
      "AI",
      "UK",
      "EH",
      "EM",
      "RY",
      "CL",
      "LH",
      "IX",
      "SG",
      "QP",
      "6E",
      "JL",
    ];
    const flightNumber = `${
      NEW[Math.floor(Math.random() * NEW.length)]
    }${Math.floor(Math.random() * 10000)}`;
    additionalFlights.push(generateRandomFlight(flightNumber));
  }
  flights = flights.concat(additionalFlights);
  console.log(`Generated ${count} more flights`);
}

const allFlightlist = displayAllFlights();

//function searchFlight() {
// const flightNumberInput = document.getElementById("flight-number").value;
// const flight = flights.find((f) => f.flightNumber === flightNumberInput);
// if (flight) {
//   displayFlightStatus(flight);
// } else {
//  alert("Flight not found!");
//}
//}

function updateFlightStatus() {
  flights = flights.map((flight) => ({
    ...flight,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
  displayAllFlights();
}

displayAllFlights();
setInterval(updateFlightStatus, 10000); // Update flight status every 10 seconds

export { allFlightlist, generateMoreFlights, displayAllFlights,updateFlightStatus };
