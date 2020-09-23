
// Initialize the platform object:
var platform = new H.service.Platform({
'apikey': 'oj5G9-yT-mmept7K0u0yuo3nabEhKdFr3J5-xmIMVQQ'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
document.getElementById('mapContainer'),
maptypes.vector.normal.map,
{
    zoom: 2,
    center: { lng: 13.4, lat: 52.51 }
});

// Define a variable holding SVG mark-up that defines an icon image:
var svgMarkup = 'static/issicon.png';

// Create an icon, an object holding the latitude and longitude, and a marker:
setInterval(() => {
  map.removeObjects(map.getObjects ()),
  $.ajax({
    type: "GET",
    url: "/api/iss",
    success: function(data) {
        //deleteMarkers();
    var icon = new H.map.Icon(svgMarkup),
        coords = {lat: parseFloat(data.latitude), lng: parseFloat(data.longitude)},
        marker = new H.map.Marker(coords, {icon: icon});
        // Add the marker to the map and center the map at the location of the marker:

        map.addObject(marker);
        map.setCenter(coords);
        }
    });

}, 4000);
