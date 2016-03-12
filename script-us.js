var map = L.map('map').setView([37.8, -96], 4);

// customize source link to your GitHub repo
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-choropleth">open-source code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
    '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    : 'Hover over a state');
};

info.addTo(map);


// get color depending on population density value
function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.density)
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

geojson = L.geoJson(data, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
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





// load polygon geojson, using data to define fillColor, from local directory
// *TO DO* rebuild file for pop density
// *TO DO* change from click to hover, and add legend to display colors and hover data
// $.getJSON("us-states.geojson", function (data) {   // insert pathname to your local directory file
//   var geoJsonLayer = L.geoJson(data, {
//     style: function (feature) {
//       var fillColor,
//         population = feature.properties.Pop2010;
//       if (population > 100000) fillColor = "#006837";
//       else if (population > 50000) fillColor ="#31a354";
//       else if (population > 15000) fillColor ="#78c679";
//       else if (population > 5000) fillColor ="#c2e699";
//       else if (population > 0) fillColor ="#ffffcc";
//       else fillColor = "#f7f7f7"; // no data
//       return {
//         'color': 'red',
//         'weight': 2,
//         'fillColor': fillColor, // sorts by method above
//         'fillOpacity': 0.8
//       }
//     },
//     onEachFeature: function( feature, layer) {
//       var popupText = "<b>" + feature.properties.Town + "</b>"   // replace labels with those from your own geojson
//          + "<br>Population 2010: " + "<br>" + feature.properties.Pop2010;
//       layer.bindPopup(popupText);
//     }
//   });  // insert ".addTo(map)" to display layer by default
//   controlLayers.addOverlay(geoJsonLayer, 'Polygons filled (CT Pop 2010)');  // insert your 'Title' to add to legend
// });
