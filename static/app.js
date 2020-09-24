// Initialize the platform object:
var platform = new H.service.Platform({
'apikey': 'gSqqb40SuuqG48b1ThWtJlint37KUS8L_BiNOuslrRc'
});
// Get an instance of the search service:
var service = platform.getSearchService();


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

        // Update text location
    // Call the reverse geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):

    let current_position = '';

        service.reverseGeocode({
            at: `${data.latitude},${data.longitude}`
        }, (result) => {
            console.log(result)

            if(result.items.length > 0) {
                result.items.forEach((item) => {
                // Assumption: ui is instantiated
                // Create an InfoBubble at the returned location with
                // the address as its contents:
                current_position = `${item.address.state==undefined ? item.address.city : item.address.state} (${item.address.countryName})`
                });

            } else {
                current_position = 'Orbiting over oceans';
            }

            document.getElementById('iss').innerHTML = current_position;

        }, );
        }
    });

}, 4000);
