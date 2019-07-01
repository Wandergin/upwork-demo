mapboxgl.accessToken = 'pk.eyJ1IjoidGhld2FuZGVyZXIiLCJhIjoiY2o0cmc3b3EzMzU2cDJ3bzBlbG4zdDk0NSJ9.N7TK1fq84boWEAxekFYv3A';
var markerCount = 0;
var bounds = [
    [-13, 40.434], // Southwest coordinates
    [13,62.634]  // Northeast coordinates
];

var mobile = $(window).innerWidth() < 1280; // Set the flag to true if the user is on mobile;

var startZoom = 16;
var minZoom = 3.5;
var flyButton = document.getElementById("fly-button")
var resetButton = document.getElementById("reset-button")

// if (mobile) {
//     startZoom = 3.5;
//     minZoom = 2.5;

//     // Disable scrolling (v3.0 iteration only!)
//     document.ontouchmove = function (e) {
//         e.preventDefault();
//     }
// }
// else {
//     // (v3.0 iteration only!)
//     document.getElementById("listing-container").classList.add("pin-bottomleft");
// }

// Initialize map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-0.091453, 51.534208], // starting position
    zoom: startZoom, // starting zoom
    maxBounds: bounds,
    minZoom: minZoom
});

var center = map.getCenter(); // Initialize the default center for the map
var startPosition = map.getCenter();
var speed = 0.1;
var offsetY = 0; // Some custom maths to adjust the offset for the popup
var zooming = false; // Flag to indicate if an action is currently happening
var prevMarker;

// Initialize places
var places = {
  "type": "FeatureCollection",
  "name": "Upwork Demo",
  "features": [
    {
      "type": "Feature",
      "properties": {
          "marker-size": "medium",
          "marker-color": "#D89A2E",
        },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.091453,
          51.534208
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "marker-size": "medium",
        "marker-color": "#a81616",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.088609,
          51.525518
        ]
      }
    }
  ]
};

// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

// Add markers to the map
function addMarkers() {
    places.features.forEach(function(marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.style.width = '24px';
        el.style.height = '37px';
        el.style.backgroundImage = 'url(images/blue-marker.png)';
        el.style.backgroundSize = "contain";
        el.id = "marker-"+markerCount;
        markerCount++;
        // add marker to map
        new mapboxgl.Marker(el, {"offset":[0,-40]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

        flyButton.addEventListener('click', function(e) {

            // Fly to the point
            flyToPlace(places.features[1].geometry.coordinates);
        }); 
        resetButton.addEventListener('click', function(e) {

            // Fly to the point
            flyToPlace(places.features[0].geometry.coordinates);
        });   
        console.log("Added marker")
    });
}

function flyToPlace(currentCenter) {
    var zoom = map.getZoom();
    var curve = 0.6;


    map.flyTo({
        center: currentCenter, // Center of the map initially or popup position when selected
        zoom: zoom,
        offset: [0, offsetY],
        speed:speed,
        curve:curve
    });
}

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

$(document).ready(function(){
    addMarkers();
});
