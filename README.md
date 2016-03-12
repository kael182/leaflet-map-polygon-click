# leaflet-map-polygon
Leaflet thematic polygon (choropleth) map, with US and Connecticut examples

## demos
- US example http://jackdougherty.github.io/leaflet-map-polygon/ct.html
- CT example http://jackdougherty.github.io/leaflet-map-polygon/us.html

## credits
- Leaflet choropleth tutorial: http://leafletjs.com/examples/choropleth.html
- Connecticut Mirror: http://ctmirror.org

## how to create your own

- Write up all steps for http://DataVizForAll.org

Strategy 1:

- Insert data into spreadsheet template (ct-towns.csv)
- Upload GeoJSON boundaries (ct-towns.geojson) into Mapshaper.org, and simplify to reduce size as needed
- In Mapshaper.org, insert command to join the CSV to the GeoJSON, then export
- Use text editor (Atom) to create new file (ct-towns.js), which declares a variable named "data" to be equal to the contents of the joined GeoJSON file.
  - start with
  ```
  var data =
  ```
  - paste in contents of the joined GeoJSON
  - end with
  ```
  ;
  ```
- Upload the ct-towns.js file to the GitHub folder; modify index.html as needed
- TO DO: automate legend?

Strategy 2:

- see CT Mirror workflow to keep map-borders.js separate; how to link data.js?

Strategy 3:
- rewrite function to pull data directly from GeoJSON file, OR
- rewrite functions to display borders directly from GeoJSON file, and pull data from CSV
