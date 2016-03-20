// Edit the center point and zoom level
var map = L.map('map', {
  center: [41.5, -72.7],
  zoom: 9,
  scrollWheelZoom: false
});

// Edit links to your GitHub repo and data source credit
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon-click">open-source code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census</a>');

// Basemap layer
new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// Edit the getColor feature.properties to match column header in the GeoJson map data
function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.density2010)
  };
}

// Edit ranges and colors; see http://colorbrewer.org
function getColor(d) {
  return d > 5000 ? '#800026' :
         d > 1000 ? '#BD0026' :
         d > 500  ? '#E31A1C' :
         d > 200  ? '#FC4E2A' :
         d > 100  ? '#FD8D3C' :
         d > 50   ? '#FEB24C' :
         d > 30   ? '#FED976' :
                    '#FFEDA0';
}

// Edit labels and properties to match column headers in GeoJSON map data
function onEachFeature(feature, layer) {
  var popupText = "<b>" + feature.properties.town + "</b>"
     + "<br>Pop Density 2010: " + "<br>" + feature.properties.density2010;
  layer.bindPopup(popupText);
}

// Edit file name of the GeoJson map data to be uploaded from your local directory
$.getJSON("ct-towns-density.geojson", function (data) {
  var geoJsonLayer = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

// Edit grades to match ranges inserted above
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 30, 50, 100, 200, 500, 1000, 5000],
    labels = [],
    from, to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);
