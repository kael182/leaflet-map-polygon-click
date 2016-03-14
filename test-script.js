var map = L.map('map', {
  center: [41.5, -72.7], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 9, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false // add later to reposition
});

// customize source link to your GitHub repo
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon">open-source code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

var lightNoLabels = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);
controlLayers.addBaseLayer(lightNoLabels, 'CartoDB Light no labels');


$.getJSON("test.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      var fillColor,
        d = feature.properties.density2010;
      if (d > 5000) fillColor = "#800026";
      else if (d > 1000) fillColor ="#BD0026";
      else if (d > 500) fillColor ="#E31A1C";
      else if (d > 200) fillColor ="#FC4E2A";
      else if (d > 100) fillColor ="#FD8D3C";
      else if (d > 50) fillColor ="#FEB24C";
      else if (d > 30) fillColor ="#FED976";
      else fillColor = "#FFEDA0"; // no data
      return {
        'color': 'white',
        'weight': 2,
        'opacity': 1,
        'dashArray': '3',
        'fillColor': fillColor, // sorts by method above
        'fillOpacity': 0.7
      }
    },
    onEachFeature: function( feature, layer) {
      var popupText = "<b>" + feature.properties.Town + "</b>"   // replace labels with those from your own geojson
         + "<br>Population 2010: " + "<br>" + feature.properties.Pop2010;
      layer.bindPopup(popupText);
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, 'CT Pop Density 2010)');  // insert your 'Title' to add to legend
});
