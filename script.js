
const buses = [
    {
        number: "KA01",
        name: "Express Travels",
        source: "Mangalore",
        destination: "Bangalore",
        time: "8:00 AM",
        fare: 450,
        available: 20
    },
    {
        number: "KA02",
        name: "City Express",
        source: "Udupi",
        destination: "Mysore",
        time: "9:00 AM",
        fare: 350,
        available: 15
    },
    {
        number: "KA03",
        name: "Coastal Travels",
        source: "Bangalore",
        destination: "Mangalore",
        time: "10:00 AM",
        fare: 500,
        available: 12
    },
    {
        number: "KA04",
        name: "Royal Bus",
        source: "Mysore",
        destination: "Udupi",
        time: "11:00 AM",
        fare: 400,
        available: 8
    },
    {
        number: "KA05",
        name: "Green Line",
        source: "Udupi",
        destination: "Bangalore",
        time: "12:00 PM",
        fare: 420,
        available: 18
    },
    {
        number: "KA06",
        name: "Fast Travels",
        source: "Mangalore",
        destination: "Mysore",
        time: "1:00 PM",
        fare: 380,
        available: 10
    },
    {
        number: "KA07",
        name: "Super Express",
        source: "Bangalore",
        destination: "Udupi",
        time: "2:00 PM",
        fare: 480,
        available: 14
    },
    {
        number: "KA08",
        name: "Coastal Rider",
        source: "Mysore",
        destination: "Mangalore",
        time: "3:00 PM",
        fare: 390,
        available: 6
    },
    {
        number: "KA09",
        name: "City Rider",
        source: "Udupi",
        destination: "Mangalore",
        time: "4:00 PM",
        fare: 250,
        available: 16
    },
    {
        number: "KA10",
        name: "Night Express",
        source: "Bangalore",
        destination: "Mysore",
        time: "8:00 PM",
        fare: 300,
        available: 22
    }
];

function displayBuses(busArray) {
    const busList = document.getElementById("busList");

    busList.innerHTML = "";

    if (busArray.length === 0) {
        busList.innerHTML = "<p>No buses found.</p>";
        return;
    }

    busArray.forEach(bus => {
        busList.innerHTML += `
            <div class="bus-card">
                <h3>${bus.name}</h3>
                <p><b>Bus Number:</b> ${bus.number}</p>
                <p><b>From:</b> ${bus.source}</p>
                <p><b>To:</b> ${bus.destination}</p>
                <p><b>Departure:</b> ${bus.time}</p>
                <p><b>Fare:</b> ₹${bus.fare}</p>
                <p><b>Seats Available:</b> ${bus.available}</p>
                <button onclick="viewDetails('${bus.number}')">
                    View Details
                </button>
            </div>
        `;
    });
}


function searchBus() {

    const search = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const source = document
        .getElementById("sourceFilter")
        .value;

    const destination = document
        .getElementById("destinationFilter")
        .value;

    const filteredBuses = buses.filter(bus => {

        const matchesSearch =
            bus.number.toLowerCase().includes(search) ||
            bus.destination.toLowerCase().includes(search);

        const matchesSource =
            source === "" || bus.source === source;

        const matchesDestination =
            destination === "" ||
            bus.destination === destination;

        return matchesSearch &&
               matchesSource &&
               matchesDestination;
    });

    displayBuses(filteredBuses);
}

function resetFilters() {

    document.getElementById("searchInput").value = "";
    document.getElementById("sourceFilter").value = "";
    document.getElementById("destinationFilter").value = "";

    displayBuses(buses);
}

function viewDetails(number) {
    const bus = buses.find(b => b.number === number);

    document.getElementById("modalDetails").innerHTML = `
        <p><b>Bus Name:</b> ${bus.name}</p>
        <p><b>Bus Number:</b> ${bus.number}</p>
        <p><b>Source:</b> ${bus.source}</p>
        <p><b>Destination:</b> ${bus.destination}</p>
        <p><b>Departure:</b> ${bus.time}</p>
        <p><b>Fare:</b> ₹${bus.fare}</p>
        <p><b>Seats Available:</b> ${bus.available}</p>

<p><b>Status:</b>
    <span class="${bus.available === 0 ? 'sold-out' :
        bus.available <= 8 ? 'few-seats' : 'available'}">
        ${bus.available === 0 ? 'Sold Out' :
        bus.available <= 8 ? 'Few Seats Left' : 'Available'}
    </span>
</p>
    `;

    document.getElementById("busModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("busModal").style.display = "none";
}


displayBuses(buses);
// Live search and filters
document.getElementById("searchInput")
    .addEventListener("input", searchBus);

document.getElementById("sourceFilter")
    .addEventListener("change", searchBus);

document.getElementById("destinationFilter")
    .addEventListener("change", searchBus);
