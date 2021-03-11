//initialize map

let map = L.map('mapid').setView([0,0], 2);
let circlesLayer = new L.LayerGroup();
let waterLayer = L.layerGroup().addTo(map);
let landLayer = L.layerGroup().addTo(map);
let totalAreaLayer = L.layerGroup().addTo(map);


//set up tile layer
L.tileLayer('images/tiles/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 2
}).addTo(map);

// Factbook url
const F_URL = 'https://compsci290_2021spring.dukecs.io/resources/data/countries/factbook.json';

//function to set up the interactive map
function startMap(jsonInfo) {
    type = getAreaType();
    waterLayer.clearLayers();
    landLayer.clearLayers();
    totalAreaLayer.clearLayers();
    Object.values(jsonInfo.countries).forEach(function(country) {
        let name = country.data.name;
        
        if (type == "water" && checkWater(country)) {
            let water = country.data.geography.area.water.value;
          
            let lat = country.data.geography.geographic_coordinates.latitude.degrees * (country.data.geography.geographic_coordinates.latitude.hemisphere === 'N' || -1);
            let long = country.data.geography.geographic_coordinates.longitude.degrees * (country.data.geography.geographic_coordinates.longitude.hemisphere === 'E' || -1);

            let circle = L.circle([lat, long], {
                title: name + " Water Area",
                alt: name + " Water Area",
                color: "blue",
                radius: 50000,
            }).addTo(waterLayer);

            circle.bindPopup('<b>Country:</b> ' + name + '<br><b>Area of Water (in sq km):</b> ' + water.toLocaleString());

        }
        else if (type == "land" && checkLand(country)) {
            let land = country.data.geography.area.land.value;
            
            let lat = country.data.geography.geographic_coordinates.latitude.degrees * (country.data.geography.geographic_coordinates.latitude.hemisphere === 'N' || -1);    
            let long = country.data.geography.geographic_coordinates.longitude.degrees * (country.data.geography.geographic_coordinates.longitude.hemisphere === 'E' || -1);

            let circle = L.circle([lat, long], {
                title: name + " Land Area",
                alt: name + " Land Area",
                color: "red",
                radius: 50000,
            }).addTo(landLayer);

            circle.bindPopup('<b>Country:</b> ' + name + '<br><b>Area of Land (in sq km):</b> ' + land.toLocaleString());

        }
        else if (type == "totalarea" && checkTotalArea(country)) {
            let totalArea = country.data.geography.area.total.value;
            let rank = country.data.geography.area.global_rank;

            let lat = country.data.geography.geographic_coordinates.latitude.degrees * (country.data.geography.geographic_coordinates.latitude.hemisphere === 'N' || -1);
            let long = country.data.geography.geographic_coordinates.longitude.degrees * (country.data.geography.geographic_coordinates.longitude.hemisphere === 'E' || -1);

            let circle = L.circle([lat, long], {
                title: name + " Total Area",
                alt: name + " Total Area",
                color: "black",
                radius: 50000,
            }).addTo(totalAreaLayer);

            circle.bindPopup('<b>Country:</b> ' + name + '<br><b>Total Area (in sq km):</b> ' + totalArea.toLocaleString() + '<br><b>World Rank:</b> ' + rank.toLocaleString());

        }
    });

}

//Checks to see which selection is chosen
function getAreaType() {
    var x = document.getElementsByName('areatype');
    for (var i = 0, length = x.length; i < length; i++) {
        if (x[i].checked) {
          return x[i].value;
        }
      }
}

//check if all data needed is present
function checkTotalArea(country) {
    return (country.data.geography && 
        country.data.geography.geographic_coordinates && 
        country.data.geography.geographic_coordinates.latitude && 
        country.data.geography.geographic_coordinates.latitude.degrees && 
        country.data.geography.geographic_coordinates.longitude && 
        country.data.geography.geographic_coordinates.longitude.degrees && 
        country.data.geography.area&& 
        country.data.geography.area.total && 
        country.data.geography.area.total.value && 
        country.data.geography.area.global_rank);
}

function checkWater(country) {
        return (country.data.geography && 
            country.data.geography.geographic_coordinates && 
            country.data.geography.geographic_coordinates.latitude && 
            country.data.geography.geographic_coordinates.latitude.degrees && 
            country.data.geography.geographic_coordinates.longitude && 
            country.data.geography.geographic_coordinates.longitude.degrees && 
            country.data.geography.area&& 
        country.data.geography.area.water && 
        country.data.geography.area.water.value);
}

function checkLand(country) {
    return (country.data.geography && 
        country.data.geography.geographic_coordinates && 
        country.data.geography.geographic_coordinates.latitude && 
        country.data.geography.geographic_coordinates.latitude.degrees && 
        country.data.geography.geographic_coordinates.longitude && 
        country.data.geography.geographic_coordinates.longitude.degrees && 
        country.data.geography.area&& 
        country.data.geography.area.land && 
        country.data.geography.area.land.value);
}
    

//Fetches factbook data
function fetchJSON () {
    fetch(F_URL)
        .then(response => response.json())
        .then(startMap)
        .catch(error => console.error(error));
}
fetchJSON();
